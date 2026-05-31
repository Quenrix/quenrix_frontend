import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, switchMap, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_BASE_URL = environment.apiBaseUrl;

export interface Job {
  id?: number; 
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  description: string;
  skills: string[];
  posted_date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private http = inject(HttpClient);
  
  // Dynamic API URLs
  private jobsUrl = `${API_BASE_URL}/careers/jobs/`; 
  private applyUrl = `${API_BASE_URL}/job-applications/submit/`;
  private applicantsUrl = `${API_BASE_URL}/job-applications/list/`; // New URL

  private jobsSubject = new BehaviorSubject<Job[]>([]);
  public jobs$ = this.jobsSubject.asObservable();

  private normalizeJobsResponse(response: unknown): Job[] {
    if (Array.isArray(response)) {
      return response as Job[];
    }

    if (response && typeof response === 'object') {
      const payload = response as { results?: Job[]; jobs?: Job[]; data?: Job[] };
      const list = payload.results || payload.jobs || payload.data;
      if (Array.isArray(list)) {
        return list;
      }
    }

    return [];
  }

  private sortByPostedDate(jobs: Job[]): Job[] {
    return [...jobs].sort((a, b) => {
      const aTime = a.posted_date ? new Date(a.posted_date).getTime() : 0;
      const bTime = b.posted_date ? new Date(b.posted_date).getTime() : 0;
      return bTime - aTime;
    });
  }

  // --- EXISTING FUNCTIONALITY (Jobs List) ---

  getJobs(): Observable<Job[]> {
    return this.http.get<unknown>(this.jobsUrl).pipe(
      map((response) => this.normalizeJobsResponse(response)),
      map((jobs) => this.sortByPostedDate(jobs)),
      catchError((error) => {
        console.error('Error fetching jobs:', error);
        return of([]);
      })
    );
  }

  getJobById(id: number): Observable<Job | null> {
    return this.getJobs().pipe(
      map((jobs) => jobs.find((job) => job.id === id) ?? null),
      catchError((error) => {
        console.error('Error fetching job detail:', error);
        return of(null);
      })
    );
  }

  loadJobs() {
    this.getJobs().subscribe({
      next: (data) => this.jobsSubject.next(data)
    });
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.jobsUrl, job).pipe(
      tap((newJob) => {
        const currentJobs = this.jobsSubject.value;
        this.jobsSubject.next([newJob, ...currentJobs]);
      })
    );
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jobsUrl}${id}/`).pipe(
      tap(() => {
        const updatedJobs = this.jobsSubject.value.filter(j => j.id !== id);
        this.jobsSubject.next(updatedJobs);
      })
    );
  }

  // --- APPLICATION FUNCTIONALITY ---

  submitApplication(formData: any, resumeFile: File): Observable<any> {
    // Step 1: Send Form Data to Backend to get S3 Presigned URL
    return this.http.post<any>(this.applyUrl, formData).pipe(
      switchMap((response) => {
        const uploadUrl = response.upload_url;
        
        if (!uploadUrl) {
          throw new Error('Upload URL not received from server');
        }

        // Step 2: Upload File directly to S3
        return this.http.put(uploadUrl, resumeFile, {
          headers: new HttpHeaders({ 
            'Content-Type': resumeFile.type || 'application/pdf' 
          })
        }).pipe(
          map(() => response)
        );
      })
    );
  }
  getApplicants(): Observable<any[]> {
    return this.http.get<any[]>(this.applicantsUrl);
  }
}