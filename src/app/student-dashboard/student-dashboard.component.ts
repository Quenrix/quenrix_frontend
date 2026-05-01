import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, Subscription, timer, Observable, of, throwError, forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService, LoginResponse, StudentBatchDetails } from '../services/api.service';
import { NavigationService } from '../services/navigation.service'; 
import { examAPi } from '../services/createexam.service'; 
import { ResumeService } from '../services/create-resume.service'; 
import { CreateBatchService } from '../services/create-batch.service';
import { CodexaChatService } from '../services/codexa-chat.service';
import { catchError, map, switchMap, tap, finalize } from 'rxjs/operators';

// --- Interfaces ---
interface Course {
  title: string;
  progress: number;
  category: string;
  instructor: string;
  code: string;
  colorClass: string;
}

interface FeatureCard {
  label: string; 
  value: string;
  icon: string;
  color: string; 
  title: string; 
  subText: string; 
  colorClass: string; 
  route: string;
  info?: string; 
}

interface ScheduleItem {
  date: string; 
  desc: string;
  type: 'class' | 'deadline' | 'session' | 'study';
  dayOfWeekShort?: string;
  dayOfMonth?: string;
  joinButton?: boolean;
}

interface AttendanceRecord {
  course: string;
  attended: number;
  total: number;
  lastUpdated: string;
}

interface AssignmentItem {
  title: string;
  subject: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Submitted';
}

interface StudyPlanItem {
  day: string;
  topic: string;
  durationMinutes: number;
  completed: boolean;
}

interface GoalItem {
  title: string;
  category: string;
  progress: number;
  targetDate: string;
}

interface LmsCourseProgress {
  title: string;
  instructor: string;
  completedTopics: number;
  totalTopics: number;
  progress: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface LearningModule {
  title: string;
  course: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Locked';
}

interface AnnouncementItem {
  title: string;
  message: string;
  createdAt: string;
  priority: 'Info' | 'Important' | 'Urgent';
  read: boolean;
}

interface GradebookItem {
  subject: string;
  assessment: string;
  score: number;
  maxScore: number;
  status: 'Published' | 'Pending';
}

interface LiveSessionItem {
  topic: string;
  faculty: string;
  startTime: string;
  mode: 'Live' | 'Recorded';
  joinUrl: string;
}

export interface StudentProfileData {
  full_name: string;
  email: string; 
  student_id: string; 
  phone: string;
  location: string;
  linkedin: string;
  experience_type: string;
  profileImageUrl: string;
  profileInitial: string;
  profileImagePlaceholder: boolean; 
  courses: Course[];
  featureCards: FeatureCard[]; 
  batchId?: number; 
  courseId?: number; 
}

interface AvailableExam {
  examId: number; 
  examName: string;
  start_datetime: string; 
  end_datetime: string;   
  is_active: boolean;     
  courseid: number; 
  batchid: number;
  subjectid: number;
  batch: { batchId: number, batchName: string }; 
  subject: { subjectid: number, subjectname: string }; 
  durationMinutes: number | null; // null = could not be derived (bad start/end data)
  totalQuestions: number; 
}

interface FilterCourse {
    course_id: number;
    course_name: string;
}

interface FilterBatch {
    batchid: number;
    batch_name: string;
    course_id: number; 
}

interface JoinBatchDetail {
  batchId: number;
  batchName: string;
  timing?: string;
  mode?: string;
  zoom_join_url?: string;
}

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit, OnDestroy {
  
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  loadingDashboardData: boolean = true; 
  searchControl = new FormControl('');
  notificationsEnabled: boolean = true; 

  // --- Page Navigation ---
  activePage: string = 'dashboard'; 
  
  // --- Profile Data ---
  studentProfileData: StudentProfileData = {
    full_name: 'Loading...',
    email: 'loading@example.com',
    student_id: '', 
    phone: '',
    location: '',
    linkedin: '',
    experience_type: '',
    profileImageUrl: '',
    profileInitial: '',
    profileImagePlaceholder: true, 
    courses: [],
    featureCards: [], 
    batchId: undefined, 
    courseId: undefined, 
  };

  // --- User & Clock Data ---
  studentName: string = 'Loading...'; 
  profileImageUrl: string = ''; 
  profileInitial: string = ''; 
  uploadedProfileImage: string | ArrayBuffer | null = null;

  greeting: string = '';
  currentDayOfWeek: string = '';
  currentMonth: string = '';
  currentDay: number = 0;
  currentTime: string = '';
  todayDate: Date = new Date();
  private timeSubscription?: Subscription;

  // --- Modal & UI State ---
  isProfileComplete: boolean = false; 
  showProfileCompletionModal: boolean = false; 
  showJoinMeetingModal: boolean = false;
  selectedBatchDetails: JoinBatchDetail[] = []; 

  // --- Feature Cards ---
  quickAccessCards: FeatureCard[] = [
    { label: 'Live Sessions', title: 'Class Meeting', value: 'Join Class', icon: 'fas fa-video', color: '#10B981', subText: 'Click to Join', colorClass: 'stat-blue', route: 'live-sessions' },
    { label: 'Exam Schedule', title: 'Upcoming Exams', value: 'View Exams', icon: 'fas fa-book-open', color: '#F59E0B', subText: 'Loading...', colorClass: 'stat-yellow', route: 'exams' },
    { label: 'AI Practice', title: 'Practice with Quenrix AI', value: 'Practice Now', icon: 'fas fa-robot', color: '#F43F5E', subText: 'Interactive Practice', colorClass: 'stat-red', route: 'home' },
    { label: 'Doubt Support', title: 'Syntax Share', value: 'Ask Doubts', icon: 'fas fa-comments', color: '#8B5CF6', subText: 'Community Support', colorClass: 'stat-purple', route: 'syntaxshare' },
  ];

  // --- Calendar & Schedule ---
  selectedMonthYear: string = '';
  displayedMonthStart: Date = new Date(); 
  calendarDays: any[] = [];
  fullScheduleDetails: ScheduleItem[] = []; 
  scheduleDetails: ScheduleItem[] = []; 
  selectedScheduleDate: Date | null = null;

  // --- Messaging ---
  message: string = '';
  messageType: 'success' | 'error' | 'warning' | '' = '';
  
  // --- EXAM PROPERTIES ---
  showExamModal: boolean = false; 
  allExams: AvailableExam[] = []; 
  isLoadingExams: boolean = false;
  selectedExamId: number | null = null;
  examToAttend: AvailableExam | null = null; 
  upcomingExams: AvailableExam[] = []; 
  
  // --- Filters ---
  studentAssignedBatches: StudentBatchDetails[] = []; 
  availableCourses: FilterCourse[] = []; 
  availableBatches: FilterBatch[] = []; 
  selectedCourseId: number | null = null; 
  selectedBatchId: number | null = null; 
  studentCoursesForFilter: FilterCourse[] = [];
  studentBatchesForFilter: FilterBatch[] = [];

  shortsList: any[] = [];

  // --- Codexa AI Ask Box ---
  codexaPrompt: string = '';
  codexaQuestionCount: number = 10;
  codexaReply: string = '';
  codexaError: string = '';
  isCodexaLoading: boolean = false;

  // --- New Feature States ---
  studentRankInBatch: number = 3;
  studyNoteText: string = '';
  studyTimerSeconds: number = 25 * 60;
  studyTimerRunning: boolean = false;
  private timerInterval: any;

  weeklyHeatmapData: { day: string, level: number }[] = [
    { day: 'Mon', level: 1 },
    { day: 'Tue', level: 3 },
    { day: 'Wed', level: 2 },
    { day: 'Thu', level: 0 },
    { day: 'Fri', level: 1 },
    { day: 'Sat', level: 0 },
    { day: 'Sun', level: 2 },
  ];

  attendanceRecords: AttendanceRecord[] = [
    { course: 'Data Structures', attended: 18, total: 20, lastUpdated: '2 days ago' },
    { course: 'Web Development', attended: 14, total: 16, lastUpdated: 'Yesterday' },
    { course: 'Database Systems', attended: 10, total: 12, lastUpdated: 'Today' },
  ];

  assignmentItems: AssignmentItem[] = [
    { title: 'Build REST API Integration', subject: 'Web Development', dueDate: '2026-04-29', priority: 'High', status: 'In Progress' },
    { title: 'Binary Tree Practice Set', subject: 'Data Structures', dueDate: '2026-05-01', priority: 'Medium', status: 'Pending' },
    { title: 'Normalization Case Study', subject: 'Database Systems', dueDate: '2026-05-03', priority: 'Low', status: 'Pending' },
  ];

  weeklyStudyPlan: StudyPlanItem[] = [
    { day: 'Monday', topic: 'Arrays and Strings Revision', durationMinutes: 60, completed: true },
    { day: 'Tuesday', topic: 'SQL Joins and Aggregations', durationMinutes: 75, completed: true },
    { day: 'Wednesday', topic: 'Angular Components Practice', durationMinutes: 90, completed: false },
    { day: 'Thursday', topic: 'Mock Test and Analysis', durationMinutes: 60, completed: false },
    { day: 'Friday', topic: 'Resume and LinkedIn Updates', durationMinutes: 40, completed: false },
  ];

  goalItems: GoalItem[] = [
    { title: 'Reach 90% attendance this term', category: 'Academic', progress: 82, targetDate: '2026-06-30' },
    { title: 'Complete 3 mock interviews', category: 'Placement', progress: 34, targetDate: '2026-07-15' },
    { title: 'Publish one strong capstone project', category: 'Portfolio', progress: 56, targetDate: '2026-08-05' },
  ];

  recommendedResources: Array<{ title: string; type: string; duration: string; action: string }> = [
    { title: 'System Design Basics for Students', type: 'Video', duration: '22 min', action: 'Watch' },
    { title: 'Top 50 SQL Interview Questions', type: 'Practice', duration: '45 min', action: 'Start Practice' },
    { title: 'Resume Bullet Improvement Checklist', type: 'Guide', duration: '10 min', action: 'Open Guide' },
  ];

  lmsCourses: LmsCourseProgress[] = [
    { title: 'Frontend Fundamentals', instructor: 'Aarav Mehta', completedTopics: 14, totalTopics: 20, progress: 70, level: 'Beginner' },
    { title: 'Data Structures in JavaScript', instructor: 'Ritika Sharma', completedTopics: 10, totalTopics: 18, progress: 56, level: 'Intermediate' },
    { title: 'Database and API Design', instructor: 'Neel Joshi', completedTopics: 7, totalTopics: 15, progress: 47, level: 'Intermediate' },
  ];

  learningModules: LearningModule[] = [
    { title: 'Semantic HTML Layout', course: 'Frontend Fundamentals', duration: '25 min', status: 'Completed' },
    { title: 'Flexbox Practice Challenge', course: 'Frontend Fundamentals', duration: '20 min', status: 'In Progress' },
    { title: 'REST API Error Handling', course: 'Database and API Design', duration: '30 min', status: 'In Progress' },
    { title: 'Time Complexity Drill Set', course: 'Data Structures in JavaScript', duration: '35 min', status: 'Locked' },
  ];

  announcements: AnnouncementItem[] = [
    {
      title: 'Mock Assessment Window Open',
      message: 'Mock assessment for frontend track is open till Sunday 10:00 PM.',
      createdAt: '2026-04-25T08:00:00',
      priority: 'Important',
      read: false,
    },
    {
      title: 'Profile Review Slots Released',
      message: 'Book your profile review slot to get resume and portfolio feedback.',
      createdAt: '2026-04-24T13:15:00',
      priority: 'Info',
      read: false,
    },
    {
      title: 'Attendance Policy Reminder',
      message: 'Maintain minimum 85% attendance to remain eligible for placement drives.',
      createdAt: '2026-04-23T11:30:00',
      priority: 'Urgent',
      read: true,
    },
  ];

  gradebookItems: GradebookItem[] = [
    { subject: 'Frontend', assessment: 'Flexbox Mini Test', score: 41, maxScore: 50, status: 'Published' },
    { subject: 'Data Structures', assessment: 'Array and String Quiz', score: 34, maxScore: 40, status: 'Published' },
    { subject: 'Database', assessment: 'SQL Assignment 2', score: 0, maxScore: 30, status: 'Pending' },
  ];

  liveSessions: LiveSessionItem[] = [];

  learningStreakDays: number = 6;

  get activeBatchName(): string {
    return this.studentAssignedBatches.length > 0
      ? this.studentAssignedBatches[0].batch_name
      : 'Not Assigned';
  }

  get todayClassCount(): number {
    const todayIso = new Date().toISOString().split('T')[0];
    return this.fullScheduleDetails.filter(item => item.date === todayIso && item.type !== 'study').length;
  }

  get nextClassLabel(): string {
    const todayIso = new Date().toISOString().split('T')[0];
    const todayItem = this.fullScheduleDetails.find(item => item.date === todayIso && item.type !== 'study');
    return todayItem?.desc || 'No class scheduled';
  }

  get pendingActionsCount(): number {
    let pending = 0;
    if (!this.isProfileComplete) pending += 1;
    if (this.studentAssignedBatches.length === 0) pending += 1;
    if (!this.notificationsEnabled) pending += 1;
    return pending;
  }

  get readinessScore(): number {
    let score = 40;
    if (this.isProfileComplete) score += 20;
    if (this.studentAssignedBatches.length > 0) score += 20;
    if (this.notificationsEnabled) score += 10;
    if (this.upcomingExams.length > 0) score += 10;
    return Math.min(score, 100);
  }

  get focusRecommendations(): string[] {
    const recommendations: string[] = [];

    if (!this.isProfileComplete) {
      recommendations.push('Complete your profile so mentors can track your learning goals.');
    }

    if (this.todayClassCount > 0) {
      recommendations.push(`Attend ${this.todayClassCount} class session${this.todayClassCount > 1 ? 's' : ''} today without missing start time.`);
    } else {
      recommendations.push('No live class today. Use this slot for self-study and revision.');
    }

    if (this.upcomingExams.length > 0) {
      recommendations.push(`Prepare for ${this.upcomingExams.length} upcoming exam${this.upcomingExams.length > 1 ? 's' : ''}.`);
    } else {
      recommendations.push('No active exams right now. Strengthen weak topics from previous modules.');
    }

    return recommendations.slice(0, 3);
  }

  get overallAttendancePercentage(): number {
    const totalClasses = this.attendanceRecords.reduce((sum, item) => sum + item.total, 0);
    const attendedClasses = this.attendanceRecords.reduce((sum, item) => sum + item.attended, 0);
    if (totalClasses === 0) return 0;
    return Math.round((attendedClasses / totalClasses) * 100);
  }

  get pendingAssignmentsCount(): number {
    return this.assignmentItems.filter(item => item.status !== 'Submitted').length;
  }

  get submittedAssignmentsCount(): number {
    return this.assignmentItems.filter(item => item.status === 'Submitted').length;
  }

  get completedStudySessions(): number {
    return this.weeklyStudyPlan.filter(item => item.completed).length;
  }

  get goalProgressAverage(): number {
    if (this.goalItems.length === 0) return 0;
    const total = this.goalItems.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(total / this.goalItems.length);
  }

  get todayStudyTargetMinutes(): number {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' });
    const plan = this.weeklyStudyPlan.find(item => item.day === today);
    return plan?.durationMinutes || 60;
  }

  get studyMinutesCompletedThisWeek(): number {
    return this.weeklyStudyPlan
      .filter(item => item.completed)
      .reduce((sum, item) => sum + item.durationMinutes, 0);
  }

  get upcomingDeadlines(): AssignmentItem[] {
    return [...this.assignmentItems]
      .filter(item => item.status !== 'Submitted')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  }

  get learningStreakScore(): number {
    return Math.min(this.learningStreakDays * 12, 100);
  }

  get profileCompletionScore(): number {
    return this.isProfileComplete ? 100 : 35;
  }

  get lmsOverallProgress(): number {
    if (this.lmsCourses.length === 0) return 0;
    const total = this.lmsCourses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(total / this.lmsCourses.length);
  }

  get completedModuleCount(): number {
    return this.learningModules.filter(module => module.status === 'Completed').length;
  }

  get unreadAnnouncementCount(): number {
    return this.announcements.filter(item => !item.read).length;
  }

  get averageGradePercent(): number {
    const published = this.gradebookItems.filter(item => item.status === 'Published' && item.maxScore > 0);
    if (published.length === 0) return 0;
    const achieved = published.reduce((sum, item) => sum + (item.score / item.maxScore) * 100, 0);
    return Math.round(achieved / published.length);
  }

  get notificationBellCount(): number {
    return this.unreadAnnouncementCount + this.pendingAssignmentsCount;
  }

  openNotifications(): void {
    this.setActivePage('lms-announcements');
  }

  get aiStudyTip(): string {
    const published = this.gradebookItems.filter(item => item.status === 'Published' && item.maxScore > 0);
    if (published.length === 0) return "Consistency is key. Try dedicating 30 minutes a day to learning.";
    
    // Find the subject with the lowest score percentage
    const lowest = published.reduce((prev, curr) => 
      (curr.score / curr.maxScore) < (prev.score / prev.maxScore) ? curr : prev
    );

    return `Focus on ${lowest.subject}. Review the ${lowest.assessment} topics to improve your score.`;
  }

  constructor(
      private cdr: ChangeDetectorRef, 
      private apiService: ApiService, 
      private examService: examAPi, 
      private resumeService: ResumeService,
      private batchService: CreateBatchService,
      private codexaChatService: CodexaChatService,
      private sanitizer: DomSanitizer,
       private navigationService: NavigationService
) {}

  ngOnInit(): void {
    this.updateClock();
    this.timeSubscription = interval(1000).subscribe(() => this.updateClock());
    this.initCalendarData();
    this.initializeShorts();
    this.studyNoteText = localStorage.getItem('studentDashboardNote') || '';

    this.fetchStudentDataFromStorage().subscribe({
      next: () => {
        this.fetchExamsAndFilter();
        this.checkProfileCompletion();
      },
      error: (err) => {
        console.error('Initial Load Failed:', err);
        this.loadingDashboardData = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.timeSubscription?.unsubscribe();
  }

  loadGlobalFilters(): void {
    if (this.availableCourses.length > 0) return;

    this.examService.fetchCourses().subscribe(courses => {
        this.availableCourses = courses.map((c: any) => ({
            course_id: c.courseid,
            course_name: c.coursename
        }));
        this.updateFilterOptions();
        this.cdr.detectChanges();
    });
  }

  private initCalendarData(): void {
    const now = new Date();
    this.displayedMonthStart = new Date(now.getFullYear(), now.getMonth(), 1); 
    this.fullScheduleDetails = this.createDummySchedule(); 
    this.populateCalendar(this.displayedMonthStart);
    this.selectedScheduleDate = this.todayDate;
    this.updateDisplayedScheduleDetails();
  }

  private fetchStudentDataFromStorage(): Observable<any> {
    const loginData: LoginResponse | null = this.apiService.getStoredStudentData(); 
    const studentId = loginData?.userId;
    this.loadingDashboardData = true; 

    if (!studentId) {
        this.loadingDashboardData = false;
        return of(null);
    }

    this.setProfileInfoFromStorage(loginData);

    return this.apiService.fetchStudentBatches(studentId).pipe(
        tap((batchDetails: StudentBatchDetails[]) => {
            this.studentAssignedBatches = batchDetails || [];
            if (this.studentAssignedBatches.length > 0) {
                const firstBatch = this.studentAssignedBatches[0];
                this.selectedBatchId = firstBatch.batchid;
                this.selectedCourseId = firstBatch.course_id;
                this.updateBatchCard(firstBatch.batch_name);
            }
        this.loadJoinBatchDetails();
            this.loadingDashboardData = false;
            this.cdr.detectChanges();
        }),
        catchError(err => {
            this.loadingDashboardData = false;
            return throwError(() => err);
        })
    );
  }

  private setProfileInfoFromStorage(loginData: any): void {
      let fullName = loginData?.info?.full_name || loginData?.username || 'Student'; 
      let email = loginData?.info?.email || '';
      let phone = loginData?.info?.phone || '';
      let location = loginData?.info?.location || '';
      let linkedin = loginData?.info?.linkedin || '';
      let experienceType = loginData?.info?.experience_type || '';
      const stored = window.localStorage.getItem('STUDENT_DATA');
      if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.info?.full_name) fullName = parsed.info.full_name;
        if (parsed.info?.email) email = parsed.info.email;
        if (parsed.info?.phone) phone = parsed.info.phone;
        if (parsed.info?.location) location = parsed.info.location;
        if (parsed.info?.linkedin) linkedin = parsed.info.linkedin;
        if (parsed.info?.experience_type) experienceType = parsed.info.experience_type;
      }
      this.studentName = fullName; 
      this.profileInitial = this.getProfileInitial(fullName);
      this.studentProfileData.full_name = fullName;
      this.studentProfileData.student_id = loginData.userId;
      this.studentProfileData.email = email || 'Not Available';
      this.studentProfileData.phone = phone || 'Not Available';
      this.studentProfileData.location = location || 'Not Available';
      this.studentProfileData.linkedin = linkedin || 'Not Available';
      this.studentProfileData.experience_type = experienceType || 'Not Available';
  }

  // ✅ Debug logs added to help trace empty exam issues
  fetchExamsAndFilter(): void {
      if (!this.selectedCourseId || !this.selectedBatchId) {
          console.warn("[Debug] Cannot fetch exams: Missing Course ID or Batch ID.");
          this.upcomingExams = [];
          this.isLoadingExams = false;
          return;
      }

      this.isLoadingExams = true;
      console.log(`[Debug] Fetching exams for Course: ${this.selectedCourseId}, Batch: ${this.selectedBatchId}`);

      this.examService.fetchStudentExams(this.selectedCourseId, this.selectedBatchId).pipe(
          finalize(() => {
              this.isLoadingExams = false;
              this.cdr.detectChanges();
          })
      ).subscribe({
          next: (exams) => {
              if (Array.isArray(exams) && exams.length === 0) {
                  console.warn(`[Debug] Django Backend returned 0 active exams for Course: ${this.selectedCourseId}, Batch: ${this.selectedBatchId}. Please check if is_active is True and end_datetime is valid in DB.`);
              } else {
                  console.log(`[Debug] Successfully fetched ${exams.length} exams.`);
              }

              this.allExams = (exams as any[]).map(exam => {
                  // Calculate actual duration from start and end datetime (no hardcoded fallback)
                  const startMs = new Date(exam.start_datetime).getTime();
                  const endMs   = new Date(exam.end_datetime).getTime();
                  const durationMinutes = (startMs && endMs && endMs > startMs)
                      ? Math.round((endMs - startMs) / 60000)
                      : null; // null signals "duration unknown" — do NOT silently default to 60

                  return {
                      examId: exam.examid,
                      examName: exam.examname,
                      start_datetime: exam.start_datetime,
                      end_datetime: exam.end_datetime,
                      is_active: exam.is_active ?? true,
                      courseid: exam.courseid,
                      batchid: exam.batchid,
                      subjectid: exam.subjectid,
                      batch: {
                          batchId: exam.batchid,
                          batchName: exam.batch_name   // backend must return batch_name
                      },
                      subject: {
                          subjectid: exam.subjectid,
                          subjectname: exam.subject_name  // backend must return subject_name
                      },
                      durationMinutes,                 // derived from start/end — no hardcoding
                      totalQuestions: exam.total_questions  // backend must return total_questions
                  };
              });
              
              this.applyExamFiltering();
          },
          error: (err) => {
              console.error('[Error] Failed to fetch student exams:', err);
              this.allExams = [];
              this.applyExamFiltering();
          }
      });
  }

  private applyExamFiltering(): void {
      this.upcomingExams = this.allExams;

      const examCard = this.quickAccessCards.find(c => c.route === 'exams');
      if (examCard) {
          if (this.upcomingExams.length > 0) {
              examCard.subText = `Next: ${this.upcomingExams[0].examName}`;
              examCard.value = `${this.upcomingExams.length} Exam${this.upcomingExams.length !== 1 ? 's' : ''}`;
          } else {
              examCard.subText = `No exams for Batch ${this.selectedBatchId}`;
              examCard.value = `0 Exams`;
          }
      }
  }

  updateClock(): void {
    const now = new Date();
    this.currentDayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    this.currentMonth = now.toLocaleString('en-US', { month: 'long' });
    this.currentDay = now.getDate();
    this.currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.todayDate = now;
    this.setGreeting(now.getHours());
  }

  private setGreeting(hour: number): void {
    if (hour < 12) this.greeting = 'Good Morning! Let\'s Code.';
    else if (hour < 17) this.greeting = 'Good Afternoon! Keep Grinding.';
    else this.greeting = 'Good Evening! Final Push.';
  }


  logout(): void {
    this.navigationService.clearUser();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login';
  }


  goToResumeView(): void {
      this.setActivePage('generate-resume');
      this.showMessage('Resume Viewer opened.', 'success');
  }

    joinMeeting(url?: string): void {
      if (!url) {
        this.showMessage('Meeting link not available for this batch.', 'error');
        return;
      }
      window.open(url, '_blank');
    }

  handleQuickCardClick(route: string): void {
    if (route === 'live-sessions') this.openJoinMeetingModal();
    else if (route === 'exams') this.openExamModal();
    else if (route === 'home') window.location.href = 'home';
    else this.setActivePage(route);
  }

  markAssignmentSubmitted(index: number): void {
    const selected = this.assignmentItems[index];
    if (!selected) return;
    this.assignmentItems[index] = { ...selected, status: 'Submitted' };
    this.showMessage('Assignment marked as submitted.', 'success');
  }

  toggleStudyPlanCompletion(index: number): void {
    const selected = this.weeklyStudyPlan[index];
    if (!selected) return;
    this.weeklyStudyPlan[index] = { ...selected, completed: !selected.completed };
    this.showMessage('Study plan status updated.', 'success');
  }

  toggleModuleStatus(index: number): void {
    const selected = this.learningModules[index];
    if (!selected || selected.status === 'Locked') return;
    const nextStatus: LearningModule['status'] = selected.status === 'Completed' ? 'In Progress' : 'Completed';
    this.learningModules[index] = { ...selected, status: nextStatus };
    this.showMessage('Module status updated.', 'success');
  }

  markAnnouncementAsRead(index: number): void {
    const selected = this.announcements[index];
    if (!selected || selected.read) return;
    this.announcements[index] = { ...selected, read: true };
  }

  // --- Kanban & Heatmap Methods ---
  saveNote(): void {
    // Note is two-way bound to studyNoteText, would save to API/localStorage here
    localStorage.setItem('studentDashboardNote', this.studyNoteText);
  }

  getKanbanTasks(status: string): AssignmentItem[] {
    return this.assignmentItems.filter(item => item.status === status);
  }

  advanceKanbanTask(task: AssignmentItem): void {
    if (task.status === 'Pending') task.status = 'In Progress';
    else if (task.status === 'In Progress') task.status = 'Submitted';
    this.showMessage(`Task moved to ${task.status}`, 'success');
  }

  // --- Study Timer Methods ---
  toggleStudyTimer(): void {
    if (this.studyTimerRunning) {
      clearInterval(this.timerInterval);
      this.studyTimerRunning = false;
    } else {
      this.studyTimerRunning = true;
      this.timerInterval = setInterval(() => {
        if (this.studyTimerSeconds > 0) {
          this.studyTimerSeconds--;
        } else {
          this.resetStudyTimer();
          this.showMessage('Study session complete!', 'success');
        }
      }, 1000);
    }
  }

  resetStudyTimer(): void {
    clearInterval(this.timerInterval);
    this.studyTimerRunning = false;
    this.studyTimerSeconds = 25 * 60; // 25 minutes default
  }

  formatTimer(totalSeconds: number): string {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  openLmsResource(action: string): void {
    this.showMessage(`${action} is available in this LMS section.`, 'success');
  }

  setCodexaPrompt(prompt: string): void {
    this.codexaPrompt = prompt;
  }

  askCodexaQuestion(): void {
    const prompt = this.codexaPrompt.trim();
    if (!prompt || this.isCodexaLoading) {
      return;
    }

    const count = Math.min(50, Math.max(1, Number(this.codexaQuestionCount) || 10));
    this.codexaQuestionCount = count;

    this.isCodexaLoading = true;
    this.codexaError = '';

    this.codexaChatService
      .sendMessage({
        message: `Generate ${count} coding practice questions for topic: ${prompt}. Return as a numbered list.`,
        question: prompt
      })
      .pipe(
        finalize(() => {
          this.isCodexaLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          this.codexaReply = res?.reply || 'No response received from Codexa AI.';
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            this.codexaError = 'Please login first. Codexa AI requires an active student session.';
            return;
          }

          this.codexaError = error?.error?.detail || error?.error?.message || 'Codexa AI se question load nahi hua. Please try again.';
        }
      });
  }

  joinLmsSession(session: LiveSessionItem): void {
    if (session.mode === 'Recorded') {
      this.showMessage('This is a recorded session. Open Learning Shorts for video playback.', 'warning');
      return;
    }
    if (session.joinUrl) {
      this.joinMeeting(session.joinUrl);
      return;
    }
    this.openJoinMeetingModal();
  }

  runPlannerAction(action: 'profile' | 'batch' | 'class' | 'exam'): void {
    if (action === 'profile') {
      this.goToProfileSetupForm();
      return;
    }

    if (action === 'batch') {
      this.setActivePage('batches');
      return;
    }

    if (action === 'class') {
      this.openJoinMeetingModal();
      return;
    }

    this.openExamModal();
  }

  openJoinMeetingModal(): void {
    if (this.studentAssignedBatches.length === 0) {
        this.showMessage('No batches assigned.', 'warning');
        return;
    }
    this.showJoinMeetingModal = true;
    if (this.selectedBatchDetails.length === 0) {
      this.loadJoinBatchDetails();
    }
  }

  private loadJoinBatchDetails(): void {
    if (this.studentAssignedBatches.length === 0) {
      this.selectedBatchDetails = [];
      this.liveSessions = [];
      return;
    }

    const courseIds = Array.from(new Set(this.studentAssignedBatches.map(b => b.course_id)));
    const requests = courseIds.map(courseId =>
      this.batchService.getBatchesByCourse(courseId).pipe(
        catchError(() => of([]))
      )
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        const courseMap = new Map<number, any[]>();
        results.forEach((list, index) => courseMap.set(courseIds[index], list));

        const merged = this.studentAssignedBatches
          .map(batch => this.mergeJoinBatchDetail(batch, courseMap.get(batch.course_id) || []))
          .filter((item): item is JoinBatchDetail => !!item);

        this.selectedBatchDetails = merged;
        this.liveSessions = this.buildLiveSessions(merged);
        this.cdr.detectChanges();
      },
      error: () => {
        this.selectedBatchDetails = [];
        this.liveSessions = [];
        this.cdr.detectChanges();
      }
    });
  }

  private mergeJoinBatchDetail(assigned: StudentBatchDetails, batchList: any[]): JoinBatchDetail | null {
    const matched = batchList.find(item => this.getBatchId(item) === assigned.batchid);
    const batchId = this.getBatchId(matched) ?? assigned.batchid;
    const batchName = matched?.batchName || matched?.batch_name || assigned.batch_name;
    if (!batchId || !batchName) return null;

    return {
      batchId,
      batchName,
      timing: matched?.timing,
      mode: matched?.mode,
      zoom_join_url: matched?.zoom_join_url || assigned.zoom_join_url
    };
  }

  private getBatchId(batch: any): number | null {
    const value = batch?.batchId ?? batch?.batchid ?? batch?.batch_id;
    if (value === undefined || value === null) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private buildLiveSessions(batches: JoinBatchDetail[]): LiveSessionItem[] {
    return batches.map(batch => ({
      topic: `${batch.batchName} Live Class`,
      faculty: 'Batch Trainer',
      startTime: batch.timing || 'Schedule to be announced',
      mode: batch.zoom_join_url ? 'Live' : 'Recorded',
      joinUrl: batch.zoom_join_url || ''
    }));
  }

  private updateBatchCard(name: string): void {
    const card = this.quickAccessCards.find(c => c.route === 'batches');
    if (card) card.subText = name;
  }

  private getProfileInitial(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  showMessage(msg: string, type: any): void {
    this.message = msg;
    this.messageType = type;
    timer(4000).subscribe(() => this.message = '');
  }

  populateCalendar(start: Date): void {
    this.calendarDays = [];
    this.selectedMonthYear = start.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    const firstDay = new Date(start.getFullYear(), start.getMonth(), 1).getDay();
    for (let i = 0; i < firstDay; i++) this.calendarDays.push({ date: '', disabled: true });
    for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(start.getFullYear(), start.getMonth(), i);
        this.calendarDays.push({ date: i, disabled: false, selected: d.toDateString() === new Date().toDateString(), fullDate: d });
    }
  }

  navigateCalendar(dir: number): void {
    this.displayedMonthStart.setMonth(this.displayedMonthStart.getMonth() + dir);
    this.populateCalendar(this.displayedMonthStart);
  }

  onDateSelect(date: Date | null): void {
    if (date) {
        this.selectedScheduleDate = date;
        this.updateDisplayedScheduleDetails();
    }
  }

  updateDisplayedScheduleDetails(): void {
    if (!this.selectedScheduleDate) return;
    const iso = this.selectedScheduleDate.toISOString().split('T')[0];
    this.scheduleDetails = this.fullScheduleDetails.filter(s => s.date === iso);
    if (this.scheduleDetails.length === 0) {
        this.scheduleDetails = [{ date: iso, desc: 'No scheduled classes. Time for self-study!', type: 'study', dayOfMonth: this.selectedScheduleDate.getDate().toString(), dayOfWeekShort: '---' }];
    }
  }

  private createDummySchedule(): ScheduleItem[] {
    return [
        { date: new Date().toISOString().split('T')[0], desc: 'Regular Batch Session', type: 'class', dayOfMonth: new Date().getDate().toString(), dayOfWeekShort: 'TODAY' }
    ];
  }

  initializeShorts() {
    this.shortsList = [{ safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/dQw4w9WgXcQ') }];
  }

  checkProfileCompletion(): void {
    const userId = this.studentProfileData.student_id;
    if (!userId) return;
    this.resumeService.getResumeData(userId).subscribe({
        next: (res: any) => {
            let fetchedName = res.full_name;
            if (!fetchedName && (res.firstName || res.lastName)) {
                fetchedName = `${res.firstName || ''} ${res.lastName || ''}`.trim();
            }

            this.isProfileComplete = !!fetchedName && res.education?.length > 0;

            if (fetchedName) {
                this.studentName = fetchedName;
                this.profileInitial = this.getProfileInitial(this.studentName);
                this.studentProfileData.full_name = this.studentName;
              this.studentProfileData.email = res.email || this.studentProfileData.email || 'Not Available';
              this.studentProfileData.phone = res.phone || this.studentProfileData.phone || 'Not Available';
              this.studentProfileData.location = res.location || this.studentProfileData.location || 'Not Available';
              this.studentProfileData.linkedin = res.linkedin || this.studentProfileData.linkedin || 'Not Available';
              this.studentProfileData.experience_type = res.experience_type || this.studentProfileData.experience_type || 'Not Available';
                this.cdr.detectChanges();
                
                const stored = window.localStorage.getItem('STUDENT_DATA');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (!parsed.info) parsed.info = {};
                    parsed.info.full_name = this.studentName;
                    window.localStorage.setItem('STUDENT_DATA', JSON.stringify(parsed));
                }
            }

            if (!this.isProfileComplete) this.showProfileCompletionModal = true;
        },
        error: (err) => console.error('Error fetching resume:', err)
    });
  }

  dismissProfileCompletionModal() { this.showProfileCompletionModal = false; }
  goToProfileSetupForm() { window.location.href = '/setup-profile'; }
  triggerProfileUpload() { this.fileInputRef.nativeElement.click(); }
  onProfileImageSelected(e: any) { /* Image handling */ }
  
  openExamModal() { 
    this.showExamModal = true; 
    this.selectedExamId = null; 
    this.fetchExamsAndFilter(); 
  }
  
  closeExamModal() { 
    this.showExamModal = false; 
    this.selectedExamId = null; 
  }
  
  closeJoinMeetingModal() { this.showJoinMeetingModal = false; }

  setActivePage(page: string): void {
    this.activePage = page;
  }

  startExam(examId?: number): void {
    const id = examId || this.selectedExamId;
    
    if (!id) {
      this.showMessage('Please select an exam first.', 'warning');
      return;
    }

    const exam = this.upcomingExams.find(e => e.examId === id);
    if (!exam) {
      this.showMessage('Selected exam not found. Please try again.', 'error');
      return;
    }

    this.examToAttend = exam;
    this.showExamModal = false;

    setTimeout(() => {
      this.activePage = 'attend-exam';
      this.cdr.detectChanges(); 
    }, 50);
  }

  onExamFinished(e: any): void { 
    this.activePage = 'dashboard';
    this.examToAttend = null;
    this.selectedExamId = null;
    this.cdr.detectChanges();
    this.showMessage('Exam completed! Welcome back.', 'success');
  }
  
  updateFilterOptions() { /* Sync dropdowns */ }
}





