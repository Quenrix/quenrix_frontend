import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerService, Job } from '../services/careers.service';
import { JobApplicationComponent } from '../job-application/job-application.component'; 

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, JobApplicationComponent],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit, OnDestroy {
  private careerService = inject(CareerService);
  
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  selectedDepartment: string = 'All';
  expandedDescriptions = new Set<string>();

  selectedJob: Job | null = null;

  // Dynamic departments list based on available jobs + defaults
  departments: string[] = ['All', 'Training', 'Administration', 'Marketing', 'Development'];

  ngOnInit() {
    // 1. Trigger the fetch from backend
    this.careerService.loadJobs();

    // 2. Subscribe to the real-time stream
    this.careerService.jobs$.subscribe(data => {
      this.jobs = data;
      
      // Update filter buttons dynamically based on actual data
      const availableDepts = new Set(this.jobs.map(j => j.department));
      this.departments = ['All', ...Array.from(availableDepts)];

      this.filterJobs();
    });
  }

  // --- FIX: Unlock scroll on component destruction ---
  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  filterJobs() {
    if (this.selectedDepartment === 'All') {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.jobs.filter(job => job.department === this.selectedDepartment);
    }
  }

  getJobKey(job: Job): string {
    return `${job.id ?? 'no-id'}-${job.title}-${job.department}`;
  }

  isDescriptionExpanded(job: Job): boolean {
    return this.expandedDescriptions.has(this.getJobKey(job));
  }

  toggleDescription(job: Job, event?: Event) {
    event?.stopPropagation();

    const jobKey = this.getJobKey(job);
    if (this.expandedDescriptions.has(jobKey)) {
      this.expandedDescriptions.delete(jobKey);
      return;
    }

    this.expandedDescriptions.add(jobKey);
  }

  setDepartment(dept: string) {
    this.selectedDepartment = dept;
    this.filterJobs();
  }

  getDepartmentCount(dept: string): number {
    return this.jobs.filter(job => job.department === dept).length;
  }

  getDepartmentInitials(dept: string): string {
    return dept
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('');
  }

  getJobImage(job: Job): string {
    const title = (job.title || '').toLowerCase();
    const dept = (job.department || '').toLowerCase();

    if (title.includes('ui') || title.includes('ux') || title.includes('design')) {
      return 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80';
    }

    if (title.includes('video') || title.includes('editor') || title.includes('content')) {
      return 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1400&q=80';
    }

    if (title.includes('test') || title.includes('qa') || title.includes('automation')) {
      return 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80';
    }

    if (dept.includes('development') || dept.includes('engineering')) {
      return 'https://images.unsplash.com/photo-1537432376769-00aabc307b87?auto=format&fit=crop&w=1400&q=80';
    }

    return 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80';
  }

  scrollToJobs() {
    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
  }

  // --- Modal Logic ---
  openApplication(job: Job) {
    this.selectedJob = job;
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  closeApplication() {
    this.selectedJob = null;
    document.body.style.overflow = 'auto'; // Unlock scroll
  }
}