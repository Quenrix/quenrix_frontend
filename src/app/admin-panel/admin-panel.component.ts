import { Component, ChangeDetectionStrategy, signal, OnInit, ViewChild, AfterViewInit, inject, computed } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserManagementComponent } from './user-management/user-management.component'; 
import { ManageCourseComponent } from './manage-course/manage-course.component'; 
import { BatchManagementComponent } from './batch-management/batch-management.component';
import { CareerService } from '../services/careers.service'; 
import { InquiryService, InquiryPayload } from '../services/inquiry.service'; 
import { AlertService } from '../services/alert.service'; // Import AlertService
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

type TabId = 'dashboard' | 'users' | 'courses' | 'batches' | 'settings' | 'upload-careers' | 'applicants' | 'inquiries'; 

interface AdminCard {
  title: string;
  subtitle: string;
  iconImage: string; 
  buttonText: string;
  colorClass: string; 
  route: string;
  targetTab?: TabId; 
}

const ADMIN_CONFIG = {
  SEARCH_PLACEHOLDER: "Search Users, Batches...", 
  HEADER_BUTTON: {
    label: "View Reports", 
    icon: "fas fa-chart-bar"
  },
  ADMIN_DETAILS: {
    name: 'Admin Head',
    role: 'System Administrator',
    profileUrl: 'https://placehold.co/80x80/4f46e5/ffffff?text=AD' 
  },
  
  ADMIN_CARDS: [
    { 
      title: 'Manage Users', 
      subtitle: 'View and manage all registered users.', 
      iconImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'View Users', 
      colorClass: 'indigo', 
      route: '/users',
      targetTab: 'users'
    },
    { 
      title: 'Manage Courses', 
      subtitle: 'View and manage all institute courses.', 
      iconImage: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'View Courses', 
      colorClass: 'violet', 
      route: '/courses',
      targetTab: 'courses'
    },
    { 
      title: 'Manage Batches', 
      subtitle: 'View and manage student batches.', 
      iconImage: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'View Batches', 
      colorClass: 'teal', 
      route: '/batches',
      targetTab: 'batches'
    },
    { 
      title: 'Job Applicants', 
      subtitle: 'View and manage received applications.', 
      iconImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'View Applicants', 
      colorClass: 'amber', 
      route: '/applicants',
      targetTab: 'applicants'
    },
    { 
      title: 'Course Inquiries', 
      subtitle: 'Track and manage student inquiries.', 
      iconImage: 'https://images.pexels.com/photos/4065624/pexels-photo-4065624.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'View Inquiries', 
      colorClass: 'red', 
      route: '/inquiries',
      targetTab: 'inquiries'
    },
    { 
      title: 'Create New User', 
      subtitle: 'Register new users (Admin, Trainer, Student) and assign roles.', 
      iconImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'Create User', 
      colorClass: 'indigo', 
      route: '/create-user' 
    },
    { 
      title: 'New Batch', 
      subtitle: 'Manage batch start dates, capacity, and student allocations.', 
      iconImage: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'Create Batch', 
      colorClass: 'violet', 
      route: '/create-batch' 
    },
    { 
      title: 'New Course', 
      subtitle: 'Define new course structure, duration, and assign a dedicated trainer.', 
      iconImage: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'Create Course', 
      colorClass: 'violet', 
      route: '/create-course' 
    },
    { 
      title: 'Assign to Batch', 
      subtitle: 'Map users (Student/Trainer) to specific batches and roles.', 
      iconImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'Assign Users', 
      colorClass: 'teal', 
      route: '/assign-user-to-batch' 
    },
    { 
      title: 'Create Exam', 
      subtitle: 'Design, configure, and schedule new tests and assessments.', 
      iconImage: 'https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'Create Exam', 
      colorClass: 'amber', 
      route: '/create-exam' 
    },
    { 
      title: 'Create Jobs', 
      subtitle: 'Post and manage new job openings for ongoing placement drives.', 
      iconImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1600', 
      buttonText: 'Manage Jobs', 
      colorClass: 'red', 
      route: '/create-job' 
    },
    { 
      title: 'Post Careers', 
      subtitle: 'Post internal job openings for the main Careers website page.', 
      iconImage: 'https://images.pexels.com/photos/4065624/pexels-photo-4065624.jpeg?auto=compress&cs=tinysrgb&w=1600', 
      buttonText: 'Website Careers', 
      colorClass: 'indigo', 
      route: '/upload-careers',
      targetTab: 'upload-careers' 
    },
    { 
      title: 'Success Stories', 
      subtitle: 'Share student placement stories and achievements on the wall of fame.', 
      iconImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600',
      buttonText: 'Add Story', 
      colorClass: 'teal', 
      route: '/create-success-story' 
    },
    { 
      title: 'Upload Blog', 
      subtitle: 'Upload and manage PDF blogs to share with students.', 
      iconImage: 'https://images.pexels.com/photos/4861362/pexels-photo-4861362.jpeg?auto=compress&cs=tinysrgb&w=1600', 
      buttonText: 'Manage Blog', 
      colorClass: 'red', 
      route: '/upload-blog' 
    },
    { 
      title: 'Upload Notes', 
      subtitle: 'Upload lecture notes, assignments, and study materials.', 
      iconImage: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600', 
      buttonText: 'Upload Notes', 
      colorClass: 'violet', 
      route: '/upload-notes' 
    }
  ] as AdminCard[]
};

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  config = ADMIN_CONFIG;
  darkModeActive = signal(false);
  activeTab = signal<TabId>('dashboard');
  
  headerSearchQuery = signal<string>(''); 
  private searchTerms = new Subject<string>();
  
  // Applicants Data Signal
  applicantsList = signal<any[]>([]);
  isLoadingApplicants = signal<boolean>(false);

  // Inquiries Data Signals
  inquiriesList = signal<InquiryPayload[]>([]);
  isLoadingInquiries = signal<boolean>(false);
  
  // Filter Signals for Inquiries
  filterStartDate = signal<string>('');
  filterEndDate = signal<string>('');
  filterCourseName = signal<string>('');

  private careerService = inject(CareerService);
  private inquiryService = inject(InquiryService); 
  private alertService = inject(AlertService); // Inject AlertService

  @ViewChild(UserManagementComponent) userManagementComponent!: UserManagementComponent; 
  @ViewChild(ManageCourseComponent) manageCourseComponent!: ManageCourseComponent;
  @ViewChild(BatchManagementComponent) batchManagementComponent!: BatchManagementComponent;

  // Computed signal for filtering inquiries
  filteredInquiries = computed(() => {
    let data = this.inquiriesList();
    const query = this.headerSearchQuery().toLowerCase();
    const startDate = this.filterStartDate();
    const endDate = this.filterEndDate();
    const courseFilter = this.filterCourseName().toLowerCase();

    // 1. Global Search (Header)
    if (query) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.email?.toLowerCase().includes(query) ||
        item.phone_number.includes(query)
      );
    }

    // 2. Course Name Filter
    if (courseFilter) {
      data = data.filter(item => item.course_name.toLowerCase().includes(courseFilter));
    }

    // 3. Date Range Filter
    if (startDate) {
      data = data.filter(item => item.created_at && new Date(item.created_at) >= new Date(startDate));
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      data = data.filter(item => item.created_at && new Date(item.created_at) < end);
    }

    return data;
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    const path = this.router.url.split('?')[0];
    const matchingCard = this.config.ADMIN_CARDS.find(card => card.route === path && card.targetTab);
    if (matchingCard && matchingCard.targetTab) {
        this.activeTab.set(matchingCard.targetTab);
        
        if (matchingCard.targetTab === 'applicants') {
          this.fetchApplicants();
        } else if (matchingCard.targetTab === 'inquiries') {
          this.fetchInquiries();
        }
    } else if (path === '/admin-panel') {
        this.activeTab.set('dashboard');
    }
  }
  
  ngAfterViewInit(): void {
      this.searchTerms.pipe(
          debounceTime(300), 
          distinctUntilChanged() 
      ).subscribe(term => {
          this.headerSearchQuery.set(term);
          const currentTab = this.activeTab();
          
          if (currentTab === 'users' && this.userManagementComponent) {
              this.userManagementComponent.triggerExternalSearch();
          } else if (currentTab === 'courses' && this.manageCourseComponent) {
              this.manageCourseComponent.triggerExternalSearch();
          } else if (currentTab === 'batches' && this.batchManagementComponent) {
              this.batchManagementComponent.triggerExternalSearch();
          }
      });
  }
  
  onHeaderSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerms.next(term);
  }

  navigateTo(route: string, tabId?: TabId): void { 

    if (tabId) {
        this.activeTab.set(tabId);
        
        if (tabId === 'applicants') {
          this.fetchApplicants();
        } else if (tabId === 'inquiries') {
          this.fetchInquiries();
        }
    }
    
    if (tabId && tabId !== 'dashboard' && this.headerSearchQuery() !== '') {
        this.headerSearchQuery.set('');
    }
    
    if (route && route !== '/applicants' && route !== '/inquiries') { 
        this.router.navigate([route]).catch(err => {
            if (!tabId) console.error(err);
        });
    }
  }

  // --- FETCHERS ---

  fetchApplicants() {
    this.isLoadingApplicants.set(true);
    this.careerService.getApplicants().subscribe({
      next: (data) => {
        this.applicantsList.set(data);
        this.isLoadingApplicants.set(false);
      },
      error: (err) => {
        console.error("Failed to fetch applicants", err);
        this.isLoadingApplicants.set(false);
        this.alertService.error("Failed to load applicants data.");
      }
    });
  }

  fetchInquiries() {
    this.isLoadingInquiries.set(true);
    this.inquiryService.getInquiries().subscribe({
      next: (data) => {
        this.inquiriesList.set(data);
        this.isLoadingInquiries.set(false);
      },
      error: (err) => {
        console.error("Failed to fetch inquiries", err);
        this.isLoadingInquiries.set(false);
        this.alertService.error("Failed to load inquiries.");
      }
    });
  }

  // --- DELETE ACTIONS ---

  deleteInquiry(id: number | undefined) {
    if (id === undefined || id === null) {
      this.alertService.error("Error: Cannot delete item with missing ID");
      return;
    }

    // Use AlertService confirm instead of browser confirm
    this.alertService.confirm('Are you sure?', 'You want to delete this inquiry?')
      .then((result) => {
        if (result.isConfirmed) {
            this.inquiryService.deleteInquiry(id).subscribe({
                next: () => {
                    this.alertService.success("Inquiry deleted successfully");
                    this.fetchInquiries(); 
                },
                error: () => this.alertService.error("Failed to delete inquiry")
            });
        }
      });
  }

  deleteAllData() {
    this.alertService.confirm('DANGER!', 'This will delete ALL inquiry records. This action cannot be undone!', 'Yes, delete all!')
      .then((result) => {
        if (result.isConfirmed) {
            this.inquiryService.deleteAllInquiries().subscribe({
                next: () => {
                    this.alertService.success("All inquiries deleted");
                    this.fetchInquiries();
                },
                error: () => this.alertService.error("Failed to delete all records")
            });
        }
      });
  }

  deleteByDateRange() {
    const start = this.filterStartDate();
    const end = this.filterEndDate();
    
    if(!start || !end) {
        this.alertService.warning("Please select both From and To dates");
        return;
    }

    this.alertService.confirm('Delete Range?', `Delete inquiries from ${start} to ${end}?`)
      .then((result) => {
        if (result.isConfirmed) {
            this.inquiryService.deleteInquiriesByDate(start, end).subscribe({
                next: (res: any) => {
                    this.alertService.success(res.message || "Inquiries deleted in range");
                    this.fetchInquiries();
                },
                error: () => this.alertService.error("Failed to delete range")
            });
        }
      });
  }

  // Demo action for "Mark as Contacted"
  markAsContacted() {
      this.alertService.success('Marked as contacted (Demo)', 'Done');
  }


  // --- ACTIONS ---

  resetFilters() {
    this.filterStartDate.set('');
    this.filterEndDate.set('');
    this.filterCourseName.set('');
    this.headerSearchQuery.set('');
  }

  logoutUser(): void {
    // Clear all stored data (Auth tokens, user info, etc.)
    localStorage.clear();
    sessionStorage.clear();

    this.alertService.success('Logged out successfully. Redirecting...', 'Goodbye');
    
    setTimeout(() => {
        // Force reload to clear memory state and redirect
        window.location.href = '/login'; 
    }, 1500); 
  }
}