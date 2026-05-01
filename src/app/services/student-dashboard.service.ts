import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AttendanceRecord {
  course: string;
  attended: number;
  total: number;
  lastUpdated: string;
}

export interface AssignmentItem {
  title: string;
  subject: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Submitted';
}

export interface AnnouncementItem {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  priority: 'Info' | 'Important' | 'Urgent';
  read: boolean;
}

export interface GradebookItem {
  subject: string;
  assessment: string;
  score: number;
  maxScore: number;
  status: 'Published' | 'Pending';
}

export interface LiveSessionItem {
  topic: string;
  faculty: string;
  startTime: string;
  mode: 'Live' | 'Recorded';
  joinUrl: string;
}

export interface ScheduleItem {
  date: string;
  desc: string;
  type: 'class' | 'deadline' | 'session' | 'study';
  dayOfWeekShort?: string;
  dayOfMonth?: string;
  joinButton?: boolean;
}

export interface GoalItem {
  title: string;
  category: string;
  progress: number;
  targetDate: string;
}

export interface ResourceItem {
  title: string;
  type: string;
  duration: string;
  action: string;
}

export interface ShortItem {
  videoUrl: string;
  title?: string;
}

export interface NotePayload {
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  // TODO: Align these endpoints with backend routes.
  getAttendance(studentId: string): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.baseUrl}/dashboard/attendance/${studentId}/`);
  }

  getAssignments(studentId: string): Observable<AssignmentItem[]> {
    return this.http.get<AssignmentItem[]>(`${this.baseUrl}/dashboard/assignments/${studentId}/`);
  }

  getAnnouncements(studentId: string): Observable<AnnouncementItem[]> {
    return this.http.get<AnnouncementItem[]>(`${this.baseUrl}/dashboard/announcements/${studentId}/`);
  }

  markAnnouncementRead(studentId: string, announcementId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/dashboard/announcements/${studentId}/${announcementId}/read/`, {});
  }

  getGradebook(studentId: string): Observable<GradebookItem[]> {
    return this.http.get<GradebookItem[]>(`${this.baseUrl}/dashboard/gradebook/${studentId}/`);
  }

  getSchedule(studentId: string): Observable<ScheduleItem[]> {
    return this.http.get<ScheduleItem[]>(`${this.baseUrl}/dashboard/schedule/${studentId}/`);
  }

  getLiveSessions(studentId: string): Observable<LiveSessionItem[]> {
    return this.http.get<LiveSessionItem[]>(`${this.baseUrl}/dashboard/live-sessions/${studentId}/`);
  }

  getGoals(studentId: string): Observable<GoalItem[]> {
    return this.http.get<GoalItem[]>(`${this.baseUrl}/dashboard/goals/${studentId}/`);
  }

  getResources(studentId: string): Observable<ResourceItem[]> {
    return this.http.get<ResourceItem[]>(`${this.baseUrl}/dashboard/resources/${studentId}/`);
  }

  getShorts(studentId: string): Observable<ShortItem[]> {
    return this.http.get<ShortItem[]>(`${this.baseUrl}/dashboard/shorts/${studentId}/`);
  }

  getNote(studentId: string): Observable<NotePayload> {
    return this.http.get<NotePayload>(`${this.baseUrl}/dashboard/notes/${studentId}/`);
  }

  saveNote(studentId: string, payload: NotePayload): Observable<any> {
    return this.http.put(`${this.baseUrl}/dashboard/notes/${studentId}/`, payload);
  }
}
