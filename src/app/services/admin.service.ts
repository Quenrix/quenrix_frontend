import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'; // ✅ Environment import kiya

// --- Interfaces ---
interface AdminFormData {
  id: string; 
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experienceYears: number | null; 
  imageUrl: string;
}

interface AdminApiPayload {
    csmit_id: string; 
    full_name: string;
    email: string;
    phone: string;
    experience_years: number; 
    image_url: string;         
}

// ✅ FIXED: environment.apiBaseUrl use kiya
const API_BASE_URL = `${environment.apiBaseUrl}/admins/`;

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) { }

  private transformToPayload(data: AdminFormData): AdminApiPayload {
    const experienceYears = data.experienceYears ?? 0;
    return {
      csmit_id: data.id, 
      full_name: `${data.firstName} ${data.lastName}`, 
      email: data.email,
      phone: data.phone,
      experience_years: experienceYears, 
      image_url: data.imageUrl,         
    };
  }
  
  private transformFromApi(apiData: any): AdminFormData {
      const parts = apiData.full_name ? apiData.full_name.split(' ') : [];
      const lastName = parts.length > 1 ? parts.pop() || '' : ''; 
      const firstName = parts.join(' '); 

      return {
          id: apiData.csmit_id, 
          firstName: firstName,
          lastName: lastName,
          email: apiData.email,
          phone: apiData.phone,
          experienceYears: apiData.experience_years, 
          imageUrl: apiData.image_url,              
      };
  }

  getAdmins(): Observable<AdminFormData[]> {
    return this.http.get<any[]>(API_BASE_URL).pipe(
        map(apiDataArray => apiDataArray.map(data => this.transformFromApi(data)))
    );
  }

  createAdmin(adminData: AdminFormData): Observable<any> {
    const payload = this.transformToPayload(adminData);
    return this.http.post<any>(API_BASE_URL, payload);
  }

  updateAdmin(adminData: AdminFormData): Observable<any> {
    const payload = this.transformToPayload(adminData);
    const url = `${API_BASE_URL}${adminData.id}/`; 
    return this.http.put<any>(url, payload); 
  }

  deleteAdmin(adminId: string): Observable<any> {
    const url = `${API_BASE_URL}${adminId}/`;
    return this.http.delete<any>(url);
  }
}

export { AdminFormData as Admin };

@Injectable({
  providedIn: 'root'
})
export class AdminConfigService {
  getAdminConfig() {
    return {
      SIDEBAR_LINKS: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-pie', route: '/admin/admin-panel' },
        { id: 'users', label: 'User Mgmt', icon: 'fas fa-users', route: '/admin/admin-panel' },
        { id: 'courses', label: 'Courses', icon: 'fas fa-book', route: '/admin/admin-panel' },
        { id: 'batches', label: 'Batches', icon: 'fas fa-layer-group', route: '/admin/admin-panel' },
        { id: 'applicants', label: 'Applicants', icon: 'fas fa-user-tie', route: '/admin/admin-panel' },
        { id: 'inquiries', label: 'Inquiries', icon: 'fas fa-envelope-open-text', route: '/admin/admin-panel' },
        { id: 'settings', label: 'Settings', icon: 'fas fa-cog', route: '/admin/admin-panel' }
      ],
      ADMIN_CARDS: [
        { title: 'Create Admin', subtitle: 'Add new system administrators', iconImage: 'assets/icons/admin.png', buttonText: 'Add Admin', colorClass: 'card-blue', route: '/admin/create-user' },
        { title: 'Create Job', subtitle: 'Post new job vacancies', iconImage: 'assets/icons/job.png', buttonText: 'Post Job', colorClass: 'card-green', route: '/admin/create-job' },
        { title: 'Manage Courses', subtitle: 'Create and edit course details', iconImage: 'assets/icons/course.png', buttonText: 'Manage', colorClass: 'card-purple', route: '/admin/create-course' },
        { title: 'Batch Setup', subtitle: 'Schedule new batches', iconImage: 'assets/icons/batch.png', buttonText: 'Schedule', colorClass: 'card-orange', route: '/admin/create-batch' }
      ]
    };
  }
}