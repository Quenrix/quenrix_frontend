import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { examAPi } from '../services/createexam.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

// ── Interfaces ────────────────────────────────────────────────────────────────

interface Course {
  courseid: number;
  coursename: string;
}

interface Batch {
  batchId: number;
  batchName: string;
}

interface Subject {
  subjectid: number;
  subjectname: string;
}

interface SubjectAPIResponse {
  course_id: number;
  course_name: string;
  subjects: Subject[];
}

interface Question {
  questionText: string;
  questionType: string;
  options: string[];
  correctOption?: number;
  points: number;
}

interface ExamMetadata {
  examName: string;
  courseid: number | null;
  batchId: number | null;
  subjectId: number | null;
  start: string;
  end: string;
}

// ── Quenrix Bot interfaces ────────────────────────────────────────────────────

export type BotQuestionType = 'mcq' | 'descriptive' | 'coding';

interface BotConfig {
  topic: string;
  questionType: BotQuestionType;
  count: number;
}

type BotState = 'idle' | 'generating' | 'preview' | 'confirm';

// ── Component ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-createexam',
  templateUrl: './createexam.component.html',
  styleUrls: ['./createexam.component.css']
})
export class CreateExamComponent implements OnInit {

  // ── Step state ──────────────────────────────────────────────────────────────
  step: 1 | 2 = 1;
  courses: Course[] = [];
  batches: Batch[] = [];
  subjects: Subject[] = [];
  minDate: string = '';

  examMetadata: ExamMetadata = {
    examName: '',
    courseid: null,
    batchId: null,
    subjectId: null,
    start: '',
    end: ''
  };

  questionTypes = ['mcq', 'discriptive', 'coding'];
  questions: Question[] = [
    { questionText: '', questionType: 'mcq', options: ['', '', '', ''], correctOption: 0, points: 1 }
  ];

  isLoading = false;

  // ── Quenrix Bot state ────────────────────────────────────────────────────────
  isBotOpen       = false;
  botState: BotState = 'idle';
  botErrorMessage = '';

  botConfig: BotConfig = {
    topic: '',
    questionType: 'mcq',
    count: 5
  };

  botGeneratedQuestions: Question[] = [];

  readonly botQuestionTypeOptions: { label: string; value: BotQuestionType; icon: string; desc: string }[] = [
    { value: 'mcq',         label: 'MCQ',         icon: '🔘', desc: 'Multiple choice with 4 options' },
    { value: 'descriptive', label: 'Descriptive',  icon: '✏️', desc: 'Open-ended written answers'    },
    { value: 'coding',      label: 'Coding',       icon: '💻', desc: 'Programming challenges'         }
  ];

  // ── Constructor ──────────────────────────────────────────────────────────────

  constructor(
    private examService: examAPi,
    private router: Router,
    private alertService: AlertService
  ) {}

  // ── Lifecycle ────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.minDate = this.formatDate(new Date());
    this.examMetadata.start = this.minDate;
    this.examMetadata.end   = this.formatDate(new Date(Date.now() + 60 * 60 * 1000));
    this.fetchCourses();
  }

  // ── Navigation ───────────────────────────────────────────────────────────────

  goBack(): void {
    this.router.navigate(['/admin/admin-panel']);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  private formatDate(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  trackByIndex(index: number): number {
    return index;
  }

  // ── Data fetching ─────────────────────────────────────────────────────────────

  fetchCourses(): void {
    this.isLoading = true;
    this.examService.fetchCourses().subscribe({
      next: (res: Course[]) => {
        this.courses = res;
        this.isLoading = false;
        if (!this.courses.length) {
          this.alertService.warning('No courses found. Please ensure data is available on the API.');
        }
      },
      error: err => {
        this.alertService.error('Failed to load courses. Check API server.');
        this.isLoading = false;
        console.error('Error fetching courses:', err);
      }
    });
  }

  onCourseSelect(): void {
    const courseId = this.examMetadata.courseid;
    this.batches = [];
    this.subjects = [];
    this.examMetadata.batchId = null;
    this.examMetadata.subjectId = null;
    if (!courseId) return;

    this.isLoading = true;

    this.examService.fetchBatches(courseId).pipe(
      catchError(err => {
        this.isLoading = false;
        this.alertService.error(`Failed to load batches for course ID: ${courseId}.`);
        return of([]);
      })
    ).subscribe((res: any[]) => {
      this.batches = res.map(b => ({
        batchId:   b.batchId,
        batchName: b.batchName || b.name || 'Unknown Batch'
      }));
      if (!this.batches.length) {
        this.alertService.info('No batches available for this course.');
      }
    });

    this.examService.fetchSubjects(courseId).pipe(
      catchError(err => {
        this.isLoading = false;
        this.alertService.error(`Failed to load subjects for course ID: ${courseId}.`);
        return of({ subjects: [] });
      })
    ).subscribe((res: SubjectAPIResponse) => {
      this.subjects = res.subjects;
      this.isLoading = false;
    });
  }

  // ── Step navigation ───────────────────────────────────────────────────────────

  onProceed(form: NgForm): void {
    if (form.invalid) {
      this.alertService.warning('Please fill in all exam details (Step 1).');
      return;
    }

    const now   = new Date();
    const start = new Date(this.examMetadata.start);
    const end   = new Date(this.examMetadata.end);

    if (start.getTime() < now.getTime() - 60_000) {
      this.alertService.warning('Start time cannot be in the past. Please choose a future time.');
      return;
    }
    if (end <= start) {
      this.alertService.warning('End time must be after the Start time.');
      return;
    }

    this.step = 2;
  }

  onBack(): void {
    this.step = 1;
  }

  addMore(): void {
    this.questions.push({
      questionText: '',
      questionType: 'mcq',
      options: ['', '', '', ''],
      correctOption: 0,
      points: 1
    });
  }

  removeQuestion(index: number): void {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);
    }
  }

  // ── Submit exam ───────────────────────────────────────────────────────────────

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.alertService.warning('Please complete all questions before submitting.');
      return;
    }

    const typeMap: Record<string, number> = { mcq: 1, discriptive: 2, coding: 3 };

    const formattedQuestions = this.questions.map(q => {
      const base = {
        question: q.questionText,
        points: q.points,
        question_typeId: typeMap[q.questionType]
      };

      if (q.questionType === 'mcq' && q.correctOption !== undefined) {
        return {
          ...base,
          options: q.options.filter(o => o).map((opt, i) => ({
            option_text: opt,
            is_correct: i === q.correctOption
          }))
        };
      }
      return base;
    });

    const { examName, courseid, batchId, subjectId, start, end } = this.examMetadata;
    const payload = {
      examName, courseId: courseid!, batchId: batchId!,
      subjectId: subjectId!, start, end,
      questions: formattedQuestions
    };

    this.isLoading = true;
    this.examService.createExam(payload).subscribe({
      next: () => {
        this.alertService.success('Exam created successfully! Moving back to Step 1.');
        this.resetFormState(form);
      },
      error: err => {
        this.alertService.error('Failed to create exam. Please check your inputs or server logs.');
        console.error('Error creating exam:', err);
        this.isLoading = false;
      }
    });
  }

  resetFormState(form: NgForm): void {
    this.isLoading = false;
    this.questions = [
      { questionText: '', questionType: 'mcq', options: ['', '', '', ''], correctOption: 0, points: 1 }
    ];
    this.minDate = this.formatDate(new Date());
    this.examMetadata = {
      examName: '',
      courseid: null,
      batchId: null,
      subjectId: null,
      start: this.minDate,
      end: this.formatDate(new Date(Date.now() + 60 * 60 * 1000))
    };
    this.batches = [];
    this.subjects = [];
    this.step = 1;
    this.fetchCourses();
  }

  // ── Quenrix Bot ───────────────────────────────────────────────────────────────

  openBot(): void {
    // Pre-fill topic hint from selected subject name (if any)
    const selectedSubject = this.subjects.find(s => s.subjectid === this.examMetadata.subjectId);
    if (selectedSubject && !this.botConfig.topic) {
      this.botConfig.topic = selectedSubject.subjectname;
    }
    this.botState       = 'idle';
    this.botErrorMessage = '';
    this.botGeneratedQuestions = [];
    this.isBotOpen = true;
  }

  closeBot(): void {
    this.isBotOpen = false;
    this.botState  = 'idle';
    this.botErrorMessage = '';
  }

  get selectedSubjectName(): string {
    return this.subjects.find(s => s.subjectid === this.examMetadata.subjectId)?.subjectname || '';
  }

  onBotGenerate(): void {
    if (!this.botConfig.topic.trim()) {
      this.botErrorMessage = 'Please enter a topic or prompt to generate questions.';
      return;
    }
    this.botErrorMessage = '';
    this.botState = 'generating';

    // Map bot type to internal type string
    const typeMap: Record<BotQuestionType, string> = {
      mcq: 'mcq',
      descriptive: 'discriptive',
      coding: 'coding'
    };

    const payload = {
      subject:       this.selectedSubjectName || 'General',
      topic:         this.botConfig.topic,
      question_type: this.botConfig.questionType,
      count:         this.botConfig.count
    };

    this.examService.generateQuestions(payload).subscribe({
      next: (res: { questions: any[] }) => {
        this.botGeneratedQuestions = res.questions.map(q => ({
          questionText: q.questionText || q.question_text || '',
          questionType: typeMap[this.botConfig.questionType] || 'mcq',
          options:      q.options && q.options.length ? q.options : ['', '', '', ''],
          correctOption: typeof q.correctOption === 'number' ? q.correctOption : 0,
          points:       q.points || (this.botConfig.questionType === 'mcq' ? 2 : 5)
        }));
        this.botState = 'preview';
      },
      error: err => {
        console.error('Quenrix Bot generation error:', err);
        this.botErrorMessage = 'AI generation failed. Please check your connection or try again.';
        this.botState = 'idle';
      }
    });
  }

  onBotConfirm(): void {
    // Replace placeholder or append — smart merge: if only 1 blank question exists, replace it
    const hasSingleBlank =
      this.questions.length === 1 &&
      !this.questions[0].questionText.trim();

    if (hasSingleBlank) {
      this.questions = [...this.botGeneratedQuestions];
    } else {
      this.questions = [...this.questions, ...this.botGeneratedQuestions];
    }

    this.alertService.success(
      `${this.botGeneratedQuestions.length} question(s) added by Quenrix Bot!`
    );
    this.closeBot();

    // Navigate to step 2 if still on step 1
    if (this.step === 1) {
      this.step = 2;
    }
  }

  onBotRegenerate(): void {
    this.botState = 'idle';
    this.botGeneratedQuestions = [];
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = {
      mcq: 'MCQ', discriptive: 'Descriptive', coding: 'Coding'
    };
    return map[type] || type;
  }

  getTypeBadgeClass(type: string): string {
    const map: Record<string, string> = {
      mcq: 'badge-mcq', discriptive: 'badge-desc', coding: 'badge-code'
    };
    return map[type] || '';
  }
}
