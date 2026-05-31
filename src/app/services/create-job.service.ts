import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface JobCreatePayload {
    jobtitle: string;
    job_type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship'; 
    reqexp: number; 
    company: string;
    location: string;
    from_passed_out_year: number;
    to_passed_out_year: number;
    hr_phone: string;
    hr_email: string;
    job_description: string;
    apply_before_date: string; 
    is_active: boolean;
}

export interface Job {
    jobid: number; 
    jobtitle: string;
    company: string;
    location: string;
    job_type: string;
    reqexp: number;
    is_active: boolean;
}

  export interface CareerJobPayload {
    title: string;
    department: string;
    type: string;
    location: string;
    experience: string;
    description: string;
    skills: string[];
  }

@Injectable({
  providedIn: 'root'
})
export class CreateJobService {
  // ✅ FIXED: Hardcoded IP hata diya hai
  private apiUrl = `${environment.apiBaseUrl}/jobs`;
  private createJobEndpoint = `${this.apiUrl}/create-job/`; 
  private listJobsEndpoint = `${this.apiUrl}/list-jobs/`;
  private careersJobsEndpoint = `${environment.apiBaseUrl}/careers/jobs/`;

  constructor(private http: HttpClient) { }

  createJob(jobData: JobCreatePayload): Observable<any> {
    return this.http.post<any>(this.createJobEndpoint, jobData);
  }

  postCareerJob(jobData: CareerJobPayload): Observable<any> {
    return this.http.post<any>(this.careersJobsEndpoint, jobData);
  }

  listJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.listJobsEndpoint);
  }
}