import { Component, ChangeDetectionStrategy, signal, OnInit, ViewChild, AfterViewInit, inject, computed } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserManagementComponent } from './user-management/user-management.component'; 
import { ManageCourseComponent } from './manage-course/manage-course.component'; 
import { BatchManagementComponent } from './batch-management/batch-management.component';
import { CareerService } from '../services/careers.service'; 
import { InquiryService, InquiryPayload } from '../services/inquiry.service'; 
import { AlertService } from '../services/alert.service'; 
import { AdminConfigService} from '../services/admin.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NavigationService } from '../services/navigation.service';

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

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  config: any = inject(AdminConfigService).getAdminConfig();
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
  private alertService = inject(AlertService);
  private navigationService = inject(NavigationService);

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

    if (query) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.email?.toLowerCase().includes(query) ||
        item.phone_number.includes(query)
      );
    }

    if (courseFilter) {
      data = data.filter(item => item.course_name.toLowerCase().includes(courseFilter));
    }

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    const path = this.router.url.split('?')[0];
    const matchingLink = this.config.SIDEBAR_LINKS.find((link: any) => link.route === path);
    if (matchingLink) {
        this.activeTab.set(matchingLink.id as TabId);
        
        if (matchingLink.id === 'applicants') {
          this.fetchApplicants();
        } else if (matchingLink.id === 'inquiries') {
          this.fetchInquiries();
        }
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

  navigateTo(route: string, tabId?: string | TabId): void { 
    if (tabId) {
        this.activeTab.set(tabId as TabId);
        
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
    this.navigationService.clearUser();
    localStorage.clear();
    sessionStorage.clear();
    
    this.alertService.success('Logged out successfully. Redirecting...', 'Goodbye');
    
    setTimeout(() => {
        window.location.href = '/login'; 
    }, 1500); 
  }
}



