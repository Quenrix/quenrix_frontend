import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // ✅ Environment import kiya gaya hai

export interface Course {
  courseid: number; 
  coursename: string; 
}

export interface BatchDetail {
  batchId: number; 
  batchName: string; 
  course: Course; 
  is_active: boolean;
  startDate?: string; 
  timing?: string;     
  mode?: string;       
  zoom_join_url?: string;
}

export interface CreateBatchPayload {
  batchName: string;
  courseId: number;
  start_date: string;
  timing: string;
  mode: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateBatchService {
  private http = inject(HttpClient);

  // ✅ FIXED: Relative paths hata kar environment variable use kiya hai, baki services ki tarah
  private readonly BATCH_BASE = `${environment.apiBaseUrl}/batches`;
  private readonly COURSE_BASE = `${environment.apiBaseUrl}/courses`;

  constructor() { }

  /**
   * URL: {apiBaseUrl}/courses/course-list/
   */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.COURSE_BASE}/course-list/`);
  }

  /**
   * URL: {apiBaseUrl}/batches/batches-by-course/{id}/
   */
  getBatchesByCourse(courseId: number): Observable<BatchDetail[]> {
    return this.http.get<BatchDetail[]>(`${this.BATCH_BASE}/batches-by-course/${courseId}/`);
  }

  /**
   * URL: {apiBaseUrl}/batches/batch-create/
   */
  createBatch(payload: CreateBatchPayload): Observable<any> {
    return this.http.post(`${this.BATCH_BASE}/batch-create/`, payload);
  }
  
  /**
   * URL: {apiBaseUrl}/batches/deactivate-batch/{id}/
   */
  deactivateBatch(batchId: number): Observable<any> {
    return this.http.patch(`${this.BATCH_BASE}/deactivate-batch/${batchId}/`, {}); 
  }

  /**
   * URL: {apiBaseUrl}/batches/reactivate-batch/{id}/
   */
  reactivateBatch(batchId: number): Observable<any> {
    return this.http.patch(`${this.BATCH_BASE}/reactivate-batch/${batchId}/`, {}); 
  }
}