import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerService, Job } from '../services/careers.service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, MobileMenuComponent, FooterComponent],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit, OnDestroy {
  private careerService = inject(CareerService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  selectedDepartment: string = 'All';
  expandedDescriptions = new Set<string>();
  @Input() showChrome = true;

  // Dynamic departments list based on available jobs + defaults
  departments: string[] = ['All', 'Training', 'Administration', 'Marketing', 'Development'];

  ngOnInit() {
    this.careerService.loadJobs();

    // Refresh jobs periodically so newly posted jobs appear without manual page reload.
    timer(30000, 30000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.careerService.loadJobs());

    this.careerService.jobs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
      this.jobs = data;
      
      // Update filter buttons dynamically based on actual data
      const availableDepts = new Set(this.jobs.map(j => j.department));
      this.departments = ['All', ...Array.from(availableDepts)];

      this.filterJobs();
      });
  }

  // --- FIX: Unlock scroll on component destruction ---
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

    if (title.includes('frontend') || title.includes('react') || title.includes('angular')) {
      return 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1400&q=80';
    }

    if (title.includes('backend') || title.includes('api') || title.includes('node')) {
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80';
    }

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

  onJobImageError(event: Event, job: Job): void {
    const target = event.target as HTMLImageElement | null;
    if (!target) {
      return;
    }

    if (target.src.startsWith('data:image/svg+xml')) {
      return;
    }

    target.src = this.getInlineFallbackImage(job);
  }

  private getInlineFallbackImage(job: Job): string {
    const title = (job.title || 'Job Opening').slice(0, 28);
    const department = (job.department || 'Careers').slice(0, 18);

    const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#2b1d5a'/>
      <stop offset='100%' stop-color='#6b46d6'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#bg)'/>
  <circle cx='1040' cy='120' r='180' fill='rgba(255,255,255,0.12)'/>
  <circle cx='140' cy='610' r='240' fill='rgba(255,255,255,0.10)'/>
  <text x='70' y='250' fill='#ffffff' font-family='Arial, sans-serif' font-size='66' font-weight='700'>${title}</text>
  <text x='70' y='330' fill='#e7dbff' font-family='Arial, sans-serif' font-size='34'>${department}</text>
  <text x='70' y='620' fill='#f0e8ff' font-family='Arial, sans-serif' font-size='30'>Quenrix Careers</text>
</svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  trackByJob(index: number, job: Job): number | string {
    return job.id ?? this.getJobKey(job) ?? index;
  }

  scrollToJobs() {
    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
  }

  openApplication(job: Job) {
    if (!job.id) {
      return;
    }
    this.router.navigate(['/careers/job', job.id]);
  }
}
