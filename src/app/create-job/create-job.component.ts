import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateJobService, Job, JobCreatePayload, CareerJobPayload } from '../services/create-job.service';
import { AlertService } from '../services/alert.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  jobData: JobCreatePayload = {
    jobtitle: '',
    job_type: 'Full-Time',
    reqexp: 0,
    company: '',
    location: '',
    from_passed_out_year: new Date().getFullYear() - 5,
    to_passed_out_year: new Date().getFullYear(),
    hr_phone: '',
    hr_email: '',
    job_description: '',
    apply_before_date: this.getFutureDate(30),
    is_active: true
  };

  jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'];

  isPanelOpen: boolean = false;
  allJobs: Job[] = [];
  filteredJobs: Job[] = [];
  isLoadingJobs: boolean = false;

  constructor(
    private jobService: CreateJobService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  private getFutureDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  createJob(): void {
    if (!this.validateFormData()) {
      return;
    }

    // FIX: null/undefined values ko safe defaults se replace karo
    const payload: JobCreatePayload = {
      ...this.jobData,
      reqexp: this.jobData.reqexp == null ? 0 : Number(this.jobData.reqexp),
      from_passed_out_year: this.jobData.from_passed_out_year == null ? new Date().getFullYear() - 5 : Number(this.jobData.from_passed_out_year),
      to_passed_out_year: this.jobData.to_passed_out_year == null ? new Date().getFullYear() : Number(this.jobData.to_passed_out_year),
      location: this.jobData.location || '',
      hr_phone: this.jobData.hr_phone || '',
      hr_email: this.jobData.hr_email || '',
    };

    this.jobService.createJob(payload)
      .pipe(
        switchMap(() =>
          this.jobService.postCareerJob(this.mapCreateJobToCareerPayload(payload)).pipe(
            map(() => ({ careerSynced: true as const })),
            catchError((syncError) => of({ careerSynced: false as const, syncError }))
          )
        )
      )
      .subscribe({
      next: (result) => {
        if (result.careerSynced) {
          this.alertService.success(`Job "${this.jobData.jobtitle}" for ${this.jobData.company} posted and published on Careers page.`);
        } else {
          this.alertService.warning(`Job "${this.jobData.jobtitle}" created, but Careers page sync failed. Please contact tech team.`);
          console.error('Careers Sync Error:', result.syncError);
        }

        this.resetForm();
        if (this.isPanelOpen) {
          this.fetchJobs();
        }
      },
      error: (err) => {
        let errorMessage = 'An unknown error occurred during job posting.';
        if (err.status === 400 && err.error) {
          // Backend se aya exact error message dikhao
          const firstKey = Object.keys(err.error)[0];
          errorMessage = firstKey
            ? `${firstKey}: ${err.error[firstKey][0]}`
            : (err.error.detail || 'Invalid data sent.');
        }
        this.alertService.error(`Posting Failed: ${errorMessage}`);
        console.error('Job Posting Error:', err);
      }
      });
  }

  private mapCreateJobToCareerPayload(job: JobCreatePayload): CareerJobPayload {
    const normalizedType = (job.job_type || '').replace('-', ' ').trim();
    const experienceYears = Number.isFinite(job.reqexp) ? Math.max(0, Number(job.reqexp)) : 0;
    const experience = experienceYears === 0 ? '0 - 1 years' : `${experienceYears}+ years`;

    return {
      title: job.jobtitle,
      department: this.getDepartmentFromTitle(job.jobtitle),
      type: normalizedType || 'Full Time',
      location: job.location || 'Remote',
      experience,
      description: job.job_description,
      skills: []
    };
  }

  private getDepartmentFromTitle(title: string): string {
    const value = (title || '').toLowerCase();
    if (value.includes('frontend') || value.includes('backend') || value.includes('full stack') || value.includes('developer')) {
      return 'Development';
    }
    if (value.includes('marketing') || value.includes('seo') || value.includes('content')) {
      return 'Marketing';
    }
    if (value.includes('hr') || value.includes('recruiter')) {
      return 'HR';
    }
    if (value.includes('design') || value.includes('ui') || value.includes('ux')) {
      return 'Design';
    }
    return 'General';
  }

  validateFormData(): boolean {
    if (!this.jobData.jobtitle || !this.jobData.company || !this.jobData.job_description) {
      this.alertService.warning('Please fill in all required fields (Title, Company, Description).');
      return false;
    }
    if (
      this.jobData.from_passed_out_year != null &&
      this.jobData.to_passed_out_year != null &&
      this.jobData.from_passed_out_year > this.jobData.to_passed_out_year
    ) {
      this.alertService.warning('"From Passed Out Year" cannot be after "To Passed Out Year".');
      return false;
    }
    return true;
  }

  resetForm(): void {
    this.jobData = {
      jobtitle: '',
      job_type: 'Full-Time',
      reqexp: 0,
      company: '',
      location: '',
      from_passed_out_year: new Date().getFullYear() - 5,
      to_passed_out_year: new Date().getFullYear(),
      hr_phone: '',
      hr_email: '',
      job_description: '',
      apply_before_date: this.getFutureDate(30),
      is_active: true
    };
  }

  goBack(): void {
    this.router.navigate(['/admin/admin-panel']);
  }

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
    if (this.isPanelOpen) {
      this.fetchJobs();
    }
  }

  fetchJobs(): void {
    this.isLoadingJobs = true;
    this.jobService.listJobs().subscribe({
      next: (data) => {
        this.allJobs = data;
        this.filteredJobs = data;
        this.isLoadingJobs = false;
      },
      error: (err) => {
        this.alertService.error('Failed to fetch job list. Check API connection.');
        this.isLoadingJobs = false;
        console.error('Fetch Jobs Error:', err);
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
