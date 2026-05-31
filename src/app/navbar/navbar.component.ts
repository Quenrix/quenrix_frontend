import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatchDetail, Course, CreateBatchService } from '../services/create-batch.service';
import { SuccessStoriesService, SuccessStory } from '../services/success-stories.service';
import { ManageNotesService, Note } from '../services/manage-notes.service';
import { UiStateService } from '../services/ui-state.service'; 
import { InquiryService } from '../services/inquiry.service'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LanguageService } from '../services/language.service';
import { htmlNotes } from '../services/notes-data/html-notes.data';
import { cssNotes } from '../services/notes-data/css-notes.data';
import { jsNotes } from '../services/notes-data/js-notes.data';
import { reactNotes } from '../services/notes-data/react-notes.data';
import { nodeNotes } from '../services/notes-data/node-notes.data';
import { sqlNotes } from '../services/notes-data/sql-notes.data';
import { mongodbNotes } from '../services/notes-data/mongodb-notes.data';

function buildPreview(topic: any): string {
  let content = `<div style="font-family: 'Inter', sans-serif; color: #334155; line-height: 1.6;">
    <h1 style="text-align: center; color: #0f172a; border-bottom: 2px solid rgba(108, 74, 182, 0.3); padding-bottom: 0.5rem;">${topic.title}</h1>
    <p style="text-align: center; color: #64748b; font-size: 1rem; margin-bottom: 2rem;">${topic.description}</p>`;
  
  topic.chapters.forEach((ch: any) => {
    content += `<div style="background: #f1f5f9; padding: 0.75rem; border-radius: 8px; font-weight: bold; margin-bottom: 1rem; margin-top: 2.5rem; color: #4f46e5; font-size: 1.2rem; border-left: 4px solid #4f46e5;">${ch.title}</div>`;
    content += `<div class="reader-body">${ch.content}</div>`;
  });
  content += `</div>`;
  return content;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private batchService = inject(CreateBatchService);
  private successService = inject(SuccessStoriesService);
  private notesService = inject(ManageNotesService);
  private uiService = inject(UiStateService);
  private inquiryService = inject(InquiryService);
  private ngZone = inject(NgZone);
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);
  private languageService = inject(LanguageService);
  private router = inject(Router);

  selectedFeature: 'batch' | 'notes' | 'success' = 'batch';
  isLoading = true;
  
  // --- Batch State ---
  featuredBatchIndex = 0;
  featuredBatch: any = null;
  upcomingBatches: any[] = [];
  private batchInterval: any;

  // --- Success Stories State ---
  successStories: SuccessStory[] = [];
  visibleStories: SuccessStory[] = []; 
  isLoadingStories = false;
  private storyInterval: any;
  currentStoryIndex = 0; 

  // --- Story Modal State ---
  selectedStory: SuccessStory | null = null;
  isStoryModalOpen = false;

  // --- Real-Time Notes State ---
  @ViewChild('noteScrollContainer') noteScrollContainer!: ElementRef;
  
  selectedSyllabus: string = '';
  syllabusOptions: string[] = [];
  
  allNotes: Note[] = [];   
  notesList: Note[] = []; 
  isLoadingNotes = false;
  noteSearchTerm = '';
  
  private noteScrollInterval: any;
  private isNoteScrollPaused = false;

  // --- Inquiry Form State ---
  showInquiryForm = false;
  inquiryForm!: FormGroup;
  isSubmitting = false;
  submissionSuccess = false;

  // --- PDF Preview State ---
  isPreviewOpen = false;
  previewUrl: SafeResourceUrl | null = null;
  previewTitle = '';
  previewTextContent = '';
  previewDescription = '';
  previewTextLines: string[] = [];

  private dummyNotes: Note[] = [
    {
      id: 9001,
      title: 'HTML Topper Notes (Rank 1)',
      description: 'Complete HTML handwritten notes by batch topper with interview questions.',
      category: 'Lecture Note',
      subject: 'HTML',
      pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaded_at: '2026-04-10T10:00:00Z',
      preview_content: buildPreview(htmlNotes)
    },
    {
      id: 9002,
      title: 'CSS Masterclass Notes',
      description: 'Advanced CSS3, Flexbox, Grid, and Animations.',
      category: 'Lecture Note',
      subject: 'CSS',
      pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaded_at: '2026-04-11T10:00:00Z',
      preview_content: buildPreview(cssNotes)
    },
    {
      id: 9003,
      title: 'JavaScript Deep Dive Notes',
      description: 'ES6+, Closures, Promises, Async/Await.',
      category: 'Lecture Note',
      subject: 'JavaScript',
      pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaded_at: '2026-04-12T10:00:00Z',
      preview_content: buildPreview(jsNotes)
    },
    {
      id: 9004,
      title: 'React.js Topper Notes',
      description: 'Hooks, Context API, Redux, and Performance Optimization.',
      category: 'Lecture Note',
      subject: 'React',
      pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaded_at: '2026-04-13T10:00:00Z',
      preview_content: buildPreview(reactNotes)
    },
    {
      id: 9005,
      title: 'Node.js & Express Topper Notes',
      description: 'Event Loop, Middleware, Authentication, and REST APIs.',
      category: 'Lecture Note',
      subject: 'Node',
      pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaded_at: '2026-04-14T11:00:00Z',
      preview_content: buildPreview(nodeNotes)
    },
    {
      id: 9006,
      title: 'SQL Topper Notes',
      description: 'Joins, Subqueries, Indexing, and Normalization.',
      category: 'Lecture Note',
      subject: 'SQL',
      pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaded_at: '2026-04-15T10:00:00Z',
      preview_content: buildPreview(sqlNotes)
    },
    {
      id: 9008,
      title: 'MongoDB Topper Notes',
      description: 'NoSQL basics, Aggregation Framework, and Indexing.',
      category: 'Lecture Note',
      subject: 'MongoDB',
      pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaded_at: '2026-04-17T12:00:00Z',
      preview_content: buildPreview(mongodbNotes)
    }
  ];

  private readonly dummyStories: SuccessStory[] = [
    {
      id: 8101,
      name: 'Aman Verma',
      role: 'Frontend Developer',
      company: 'Infosys',
      package: '6.2 LPA',
      quote: 'Quenrix ke mock interviews aur project guidance ne mera confidence totally transform kar diya.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg'
    },
    {
      id: 8102,
      name: 'Ritika Sharma',
      role: 'Data Analyst',
      company: 'Wipro',
      package: '7.1 LPA',
      quote: 'Study plan, notes aur weekly mentorship ki wajah se placement prep ka clear roadmap mila.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg'
    },
    {
      id: 8103,
      name: 'Nikhil Raj',
      role: 'Software Engineer',
      company: 'TCS',
      package: '8.0 LPA',
      quote: 'Batch sessions + revision notes + coding practice set ne meri interview hit-rate kaafi improve ki.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg'
    },
    {
      id: 8104,
      name: 'Sneha Gupta',
      role: 'Backend Developer',
      company: 'Capgemini',
      package: '9.4 LPA',
      quote: 'Real-world assignments aur mentor feedback ne mujhe production-level coding soch di.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg'
    }
  ];

  private readonly dummyBatches = [
    {
      courseName: 'Full Stack Web Development',
      startDate: '2026-06-01',
      time: '10:00 AM - 12:00 PM',
      mode: 'Online',
      description: 'Master HTML, CSS, JavaScript, React, and Node.js with hands-on projects.',
      tags: ['Enrolling Now', 'Online', '100% Placement'],
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    },
    {
      courseName: 'Data Science & Machine Learning',
      startDate: '2026-06-15',
      time: '02:00 PM - 04:00 PM',
      mode: 'Hybrid',
      description: 'Learn Python, SQL, Machine Learning, and Data Visualization.',
      tags: ['Enrolling Now', 'Hybrid', 'Top Rated'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    }
  ];

  ngOnInit() {
    this.initForm();
    this.fetchRealTimeBatches();
    this.fetchSuccessStories(); 
    this.loadSubjects();

    this.uiService.action$.subscribe(payload => {
      if (payload.action === 'show-notes') {
        this.selectFeature('notes');
        this.scrollToFeatures();
      } else if (payload.action === 'show-success') {
        this.selectFeature('success');
        this.scrollToFeatures();
      }
    });
  }

  scrollToFeatures() {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnDestroy() {
    this.stopBatchRotation();
    this.stopNoteScroll();
    this.stopStoryRotation(); 
    document.body.style.overflow = 'auto';
  }

  // --- INQUIRY FORM LOGIC ---
  initForm() {
    this.inquiryForm = this.fb.group({
      name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.email]], 
      course_name: ['General', Validators.required]
    });
  }

  openInquiryForm(courseName: string = 'General') {
    // Stop background activities when form opens to prevent glitches
    this.stopBatchRotation();
    this.stopStoryRotation();

    this.submissionSuccess = false;
    this.inquiryForm.patchValue({ course_name: courseName });
    this.showInquiryForm = true;
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  closeInquiryForm() {
    this.showInquiryForm = false;
    this.inquiryForm.reset();
    this.submissionSuccess = false;
    document.body.style.overflow = 'auto'; // Unlock scroll

    // Resume background activities
    this.startBatchRotation();
    this.startStoryRotation();
  }

  // Improved Overlay Click Handler
  // This ensures the form only closes if the user clicks strictly on the overlay,
  // not if they drag mouse from inside the form to outside.
  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeInquiryForm();
    }
  }

  submitInquiry() {
    if (this.inquiryForm.valid) {
      this.isSubmitting = true;
      const formData = this.inquiryForm.value;
      
      this.inquiryService.createInquiry(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
        },
        error: (error) => {
          console.error('Inquiry submission failed', error);
          this.isSubmitting = false;
          alert(this.t('nav.submitFailed'));
        }
      });
    } else {
      this.inquiryForm.markAllAsTouched();
    }
  }

  // --- Notes Logic ---
  loadSubjects() {
    this.notesService.getAllSubjects().pipe(
      timeout(3000),
      catchError(err => {
        console.warn('Failed or timed out loading subjects', err);
        return of(null);
      })
    ).subscribe({
      next: (subjects) => {
        const validSubjects = subjects ? subjects.filter(s => s && s.trim().length > 0) : [];
        this.syllabusOptions = validSubjects.length > 0
          ? validSubjects
          : [...new Set(this.dummyNotes.map(note => note.subject))];
        if (this.syllabusOptions.length > 0) {
           this.selectedSyllabus = this.syllabusOptions[0];
        }
        this.loadAllNotes();
      },
      error: (err) => {
        console.error('Failed to load subjects', err);
        this.syllabusOptions = [...new Set(this.dummyNotes.map(note => note.subject))];
        this.selectedSyllabus = this.syllabusOptions[0] || '';
        this.loadAllNotes();
      }
    });
  }

  selectFeature(feature: 'batch' | 'notes' | 'success') {
    this.selectedFeature = feature;
    if (feature === 'notes') {
      this.applyNoteFilter();
    }
  }

  onSyllabusChange(newSubject: string) {
    this.selectedSyllabus = newSubject;
    this.noteSearchTerm = ''; // Clear search when changing subject
    this.applyNoteFilter();
  }

  masterNotes: Note[] = [];

  loadAllNotes() {
    this.isLoadingNotes = true;
    this.stopNoteScroll();
    this.notesList = [];

    this.notesService.getNotes().pipe(
      timeout(3000),
      catchError(err => {
        console.warn('Failed or timed out fetching all notes', err);
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        const backendNotes = data || [];
        this.masterNotes = [...backendNotes, ...this.dummyNotes];

        // Unique ID de-duplication
        const seen = new Set();
        this.masterNotes = this.masterNotes.filter(note => {
          if (!note.id) return true;
          const duplicate = seen.has(note.id);
          seen.add(note.id);
          return !duplicate;
        });

        this.applyNoteFilter();
        this.isLoadingNotes = false;
        setTimeout(() => this.startNoteScroll(), 500);
      },
      error: (err) => {
        console.error('Error fetching all notes:', err);
        this.masterNotes = [...this.dummyNotes];
        this.applyNoteFilter();
        this.isLoadingNotes = false;
        setTimeout(() => this.startNoteScroll(), 300);
      }
    });
  }

  onNoteSearch(termOrEvent: string | Event) {
    const term = typeof termOrEvent === 'string'
      ? termOrEvent
      : ((termOrEvent.target as HTMLInputElement)?.value ?? '');

    this.noteSearchTerm = term;
    this.applyNoteFilter();
    setTimeout(() => this.startNoteScroll(), 120);
  }

  private applyNoteFilter(): void {
    const term = this.noteSearchTerm.trim().toLowerCase();

    if (!term) {
      // Filter strictly by selected syllabus/subject
      const subjectLower = this.selectedSyllabus.toLowerCase();
      this.notesList = this.masterNotes.filter(
        note => note.subject?.toLowerCase() === subjectLower
      );
      return;
    }

    // Filter globally across all subjects
    this.notesList = this.masterNotes.filter((note) => {
      const title = note.title?.toLowerCase() ?? '';
      const description = note.description?.toLowerCase() ?? '';
      const category = note.category?.toLowerCase() ?? '';
      const subject = note.subject?.toLowerCase() ?? '';
      return title.includes(term) || description.includes(term) || category.includes(term) || subject.includes(term);
    });
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'Lecture Note': return 'cat-lecture';
      case 'Assignment': return 'cat-assignment';
      case 'Lab Manual': return 'cat-lab';
      case 'Question Paper': return 'cat-paper';
      default: return '';
    }
  }

  // --- Preview Modal Logic ---
  openPreviewModal(note: Note) {
    const subjectLower = note.subject?.toLowerCase() || '';
    const topicsMap: { [key: string]: string } = {
      'html': 'html',
      'css': 'css',
      'javascript': 'js',
      'js': 'js',
      'react': 'react',
      'node': 'node',
      'sql': 'sql',
      'mongodb': 'mongodb'
    };

    if (topicsMap[subjectLower]) {
      this.router.navigate(['/study-material'], { queryParams: { topic: topicsMap[subjectLower] } });
      return;
    }

    if (!note.id || note.id >= 9000) {
      this.previewTitle = note.title;
      this.previewDescription = note.description || '';
      this.previewTextContent = note.preview_content || this.buildDefaultPreview(note);
      this.previewTextLines = this.previewTextContent.split('\n').filter(line => line.trim().length > 0);
      this.previewUrl = null;
      this.isPreviewOpen = true;
      document.body.style.overflow = 'hidden';
      return;
    }

    this.notesService.getDownloadLink(note.id).subscribe({
      next: (res) => {
        if (res.download_url) {
           this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.download_url);
           this.previewTitle = note.title;
           this.previewDescription = note.description || '';
           this.previewTextContent = '';
           this.isPreviewOpen = true;
           document.body.style.overflow = 'hidden'; // Lock scroll
        }
      },
      error: () => alert(this.t('nav.previewLoadFailed'))
    });
  }

  closePreviewModal() {
    this.isPreviewOpen = false;
    this.previewUrl = null;
    this.previewTextContent = '';
    this.previewDescription = '';
    document.body.style.overflow = 'auto'; // Unlock scroll
  }

  private buildDefaultPreview(note: Note): string {
    return `${note.title}\n• Subject: ${note.subject}\n• Category: ${note.category}\n• Summary: ${note.description}`;
  }

  startNoteScroll() {
    this.stopNoteScroll();
    if (this.noteScrollContainer && 
        this.noteScrollContainer.nativeElement.scrollHeight > this.noteScrollContainer.nativeElement.clientHeight) {
      this.ngZone.runOutsideAngular(() => {
        this.noteScrollInterval = setInterval(() => {
          if (!this.isNoteScrollPaused && this.noteScrollContainer) {
            const el = this.noteScrollContainer.nativeElement;
            el.scrollTop += 1; 
            if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
              el.scrollTop = 0;
            }
          }
        }, 50); 
      });
    }
  }

  stopNoteScroll() { if (this.noteScrollInterval) clearInterval(this.noteScrollInterval); }
  pauseNoteScroll() { this.isNoteScrollPaused = true; }
  resumeNoteScroll() { this.isNoteScrollPaused = false; }


  // --- BATCH LOGIC ---

  fetchRealTimeBatches() {
    this.isLoading = true;
    this.batchService.getCourses().pipe(
      timeout(3000),
      catchError(err => {
        console.warn('Failed or timed out fetching courses', err);
        return of([]);
      })
    ).subscribe({
      next: (courses: Course[]) => {
        if (!courses || courses.length === 0) { this.handleEmptyBatches(); return; }
        
        const batchRequests = courses.map(course => 
          this.batchService.getBatchesByCourse(course.courseid).pipe(
            timeout(3000),
            catchError(err => {
              console.warn(`Could not fetch batches for course ${course.courseid}`, err);
              return of([]); 
            })
          )
        );
        
        forkJoin(batchRequests).subscribe({
          next: (responses: BatchDetail[][]) => {
            let allActiveBatches: BatchDetail[] = [];

            responses.forEach((batchList, index) => {
              const currentCourse = courses[index];
              const activeForCourse = batchList.filter(b => {
                 const isActive = b.is_active as any;
                 return isActive !== false && isActive != 0 && isActive !== '0';
              });
              
              activeForCourse.forEach(b => {
                if (!b.course) {
                  b.course = currentCourse; 
                } else if (!b.course.coursename) {
                   b.course = currentCourse;
                }
              });

              allActiveBatches = [...allActiveBatches, ...activeForCourse];
            });

            this.mapToUIModel(allActiveBatches);
          },
          error: (err) => {
            console.error('Global error in batch fetch', err);
            this.handleEmptyBatches();
          }
        });
      },
      error: () => this.handleEmptyBatches()
    });
  }

  mapToUIModel(backendBatches: BatchDetail[]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const validBatches = backendBatches.filter(batch => {
      const bAny = batch as any;
      const rawDate = batch.startDate || bAny.start_date || bAny.startDate || bAny.StartDate;
      if (!rawDate) return true; 
      
      if (typeof rawDate === 'string' && rawDate.indexOf('-') > -1) {
        const parts = rawDate.split('-');
        if (parts.length >= 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10) - 1; 
          const d = parseInt(parts[2], 10);
          const batchDate = new Date(y, m, d);
          return batchDate >= today; 
        }
      }
      const batchDate = new Date(rawDate);
      if (isNaN(batchDate.getTime())) return true; 
      return batchDate >= today;
    });

    if (validBatches.length === 0) { 
        this.handleEmptyBatches(); 
        return; 
    }

    validBatches.sort((a, b) => {
      const aAny = a as any;
      const bAny = b as any;
      const dateAStr = a.startDate || aAny.start_date || aAny.startDate;
      const dateBStr = b.startDate || bAny.start_date || bAny.startDate;
      
      const dateA = dateAStr ? new Date(dateAStr).getTime() : Infinity;
      const dateB = dateBStr ? new Date(dateBStr).getTime() : Infinity;
      return dateA - dateB;
    });

    const defaultImages = [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    ];

    this.upcomingBatches = validBatches.map((batch, index) => {
      const bAny = batch as any;
      const finalStartDate = batch.startDate || bAny.start_date || bAny.startDate || null;
      const finalTiming = batch.timing || bAny.timing || this.t('nav.defaultTime');
      const finalMode = batch.mode || bAny.mode || this.t('nav.defaultMode');

      return {
        courseName: batch.course?.coursename || batch.batchName || this.t('nav.defaultCourse'),
        startDate: finalStartDate, 
        time: finalTiming,
        mode: finalMode, 
        description: this.t('nav.batchDesc', { batch: batch.batchName, mode: finalMode }),
        tags: [this.t('nav.enrollingNow'), finalMode, this.t('nav.tagPlacement')],
        imageUrl: defaultImages[index % defaultImages.length]
      };
    });
    
    this.featuredBatch = this.upcomingBatches[0];
    this.isLoading = false;
    this.startBatchRotation();
  }

  handleEmptyBatches() {
    this.upcomingBatches = [...this.dummyBatches];
    this.featuredBatch = this.upcomingBatches[0];
    this.isLoading = false;
    this.startBatchRotation();
  }

  startBatchRotation() {
    this.stopBatchRotation();
    if (this.upcomingBatches.length > 1) {
      this.batchInterval = setInterval(() => {
        this.featuredBatchIndex = (this.featuredBatchIndex + 1) % this.upcomingBatches.length;
        this.featuredBatch = this.upcomingBatches[this.featuredBatchIndex];
      }, 6000);
    }
  }

  stopBatchRotation() { if (this.batchInterval) clearInterval(this.batchInterval); }

  // --- SUCCESS STORIES LOGIC ---

  fetchSuccessStories() {
      this.isLoadingStories = true;
      this.successService.getStories().pipe(
        timeout(3000),
        catchError(err => {
          console.warn('Failed or timed out fetching stories', err);
          return of(null);
        })
      ).subscribe({
          next: (data) => { 
            this.successStories = data && data.length > 0 ? data : [...this.dummyStories];
            this.isLoadingStories = false; 
            
            if (this.successStories.length > 0) {
               this.updateVisibleStories();
               this.startStoryRotation();
            }
          },
          error: (err) => {
            console.error('Error fetching stories', err);
            this.successStories = [...this.dummyStories];
            this.updateVisibleStories();
            this.startStoryRotation();
            this.isLoadingStories = false;
          }
      });
  }

  private getDummyNotesBySubject(subject: string): Note[] {
    const normalized = (subject || '').trim().toLowerCase();
    const filtered = this.dummyNotes.filter(note => note.subject.toLowerCase() === normalized);
    return filtered.length > 0 ? filtered : [...this.dummyNotes];
  }

  updateVisibleStories() {
    if (this.successStories.length === 0) return;
    
    const count = 3; 
    this.visibleStories = [];
    
    for (let i = 0; i < count; i++) {
      const index = (this.currentStoryIndex + i) % this.successStories.length;
      this.visibleStories.push(this.successStories[index]);
    }
  }

  startStoryRotation() {
    this.stopStoryRotation();
    this.storyInterval = setInterval(() => {
      this.currentStoryIndex = (this.currentStoryIndex + 1) % this.successStories.length;
      this.updateVisibleStories();
    }, 5000);
  }

  stopStoryRotation() {
    if (this.storyInterval) clearInterval(this.storyInterval);
  }

  openStoryModal(story: SuccessStory) {
    this.selectedStory = story;
    this.isStoryModalOpen = true;
    this.stopStoryRotation(); 
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  closeStoryModal() {
    this.isStoryModalOpen = false;
    this.selectedStory = null;
    this.startStoryRotation(); 
    document.body.style.overflow = 'auto'; // Unlock scroll
  }
  t(key: string, params?: Record<string, string | number>): string {
    return this.languageService.t(key, params);
  }
}