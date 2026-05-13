import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService, Job } from '../services/careers.service';
import { JobApplicationComponent } from '../job-application/job-application.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-careers-job-detail',
  standalone: true,
  imports: [CommonModule, JobApplicationComponent, MobileMenuComponent, FooterComponent],
  templateUrl: './careers-job-detail.component.html',
  styleUrls: ['./careers-job-detail.component.css']
})
export class CareersJobDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private careerService = inject(CareerService);

  job: Job | null = null;
  isLoading = true;
  isApplying = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const jobId = Number(idParam);

    if (!jobId || Number.isNaN(jobId)) {
      this.isLoading = false;
      return;
    }

    this.careerService.getJobById(jobId).subscribe((job) => {
      this.job = job;
      this.isLoading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/careers']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  startApply(): void {
    this.isApplying = true;
    setTimeout(() => {
      document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  closeApply(): void {
    this.isApplying = false;
  }

  getDescriptionSummary(description: string | undefined): string {
    const lines = this.getNormalizedLines(description);
    return lines.length > 0 ? lines[0] : 'No description available yet.';
  }

  getDescriptionPoints(description: string | undefined): string[] {
    const lines = this.getNormalizedLines(description);
    return lines.slice(1).map((line) => line.replace(/^[-*•]\s*/, '').trim());
  }

  private getNormalizedLines(description: string | undefined): string[] {
    return (description || '')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
}
