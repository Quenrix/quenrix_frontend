import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Note {
  id: number;
  title: string;
  description: string;
  category: string;
  subject: string;
  pdf_url: string;
  uploaded_at: string;
  preview_content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManageNotesService {
  
  private http = inject(HttpClient);
  
  private baseUrl = `${environment.apiBaseUrl}/notes`;

  constructor() { }

  // 1. Metadata Create karo (API Call)
  createNoteMetadata(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload/`, data);
  }

  // 2. Upload File to S3
  // Note: presignedUrl direct S3 ka hota hai, isliye ise change nahi karna.
  uploadToS3(presignedUrl: string, file: File): Observable<any> {
    return this.http.put(presignedUrl, file, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // 3. Notes Fetch karo
  getNotes(subject?: string, category?: string): Observable<Note[]> {
    let params = new HttpParams();
    if (subject) params = params.set('subject', subject);
    if (category) params = params.set('category', category);

    return this.http.get<Note[]>(`${this.baseUrl}/list/`, { params }).pipe(timeout(1500));
  }

  // 4. Download Link
  getDownloadLink(id: number): Observable<{download_url: string}> {
    return this.http.get<{download_url: string}>(`${this.baseUrl}/${id}/download/`).pipe(timeout(1500));
  }

  // 5. Unique Subjects laao
  getAllSubjects(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/subjects/`).pipe(timeout(1500));
  }
}