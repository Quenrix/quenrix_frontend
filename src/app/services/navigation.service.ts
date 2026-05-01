import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
  roles?: string[];
  badge?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private userRole = signal<string | null>(null);
  private userId = signal<string | null>(null);

  private readonly NAV_CONFIG: Record<string, NavItem[]> = {
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', route: '/admin/admin-panel', roles: ['admin'] },
      {
        id: 'users',
        label: 'Users',
        icon: 'fas fa-users',
        route: '',
        roles: ['admin'],
        children: [
          { id: 'create-user', label: 'Create User', icon: 'fas fa-user-plus', route: '/admin/create-user', roles: ['admin'] }
        ]
      },
      {
        id: 'courses',
        label: 'Courses',
        icon: 'fas fa-book-open',
        route: '',
        roles: ['admin'],
        children: [
          { id: 'create-course', label: 'Create Course', icon: 'fas fa-plus', route: '/admin/create-course', roles: ['admin'] },
          { id: 'manage-courses', label: 'Manage Courses', icon: 'fas fa-cog', route: '/admin/manage-course', roles: ['admin'] }
        ]
      },
      {
        id: 'batches',
        label: 'Batches',
        icon: 'fas fa-graduation-cap',
        route: '',
        roles: ['admin'],
        children: [
          { id: 'create-batch', label: 'Create Batch', icon: 'fas fa-plus', route: '/admin/create-batch', roles: ['admin'] },
          { id: 'batch-management', label: 'Manage Batches', icon: 'fas fa-cog', route: '/admin/batch-management', roles: ['admin'] },
          { id: 'assign-batch', label: 'Assign Users', icon: 'fas fa-link', route: '/admin/assign-user-to-batch', roles: ['admin'] },
          { id: 'course-batch-management', label: 'Course-Batch Mapping', icon: 'fas fa-exchange-alt', route: '/admin/course-batch-management', roles: ['admin'] }
        ]
      },
      {
        id: 'exams',
        label: 'Exams',
        icon: 'fas fa-clipboard-list',
        route: '',
        roles: ['admin'],
        children: [
          { id: 'create-exam', label: 'Create Exam', icon: 'fas fa-plus', route: '/admin/create-exam', roles: ['admin'] }
        ]
      },
      {
        id: 'jobs',
        label: 'Jobs & Careers',
        icon: 'fas fa-briefcase',
        route: '',
        roles: ['admin'],
        children: [
          { id: 'create-job', label: 'Post Jobs', icon: 'fas fa-plus', route: '/admin/create-job', roles: ['admin'] },
          { id: 'upload-careers', label: 'Website Careers', icon: 'fas fa-link', route: '/admin/upload-careers', roles: ['admin'] },
          { id: 'job-applications', label: 'Applications', icon: 'fas fa-file-alt', route: '/admin/job-application', roles: ['admin'] }
        ]
      },
      {
        id: 'content',
        label: 'Content',
        icon: 'fas fa-file-alt',
        route: '',
        roles: ['admin'],
        children: [
          { id: 'upload-blog', label: 'Blog', icon: 'fas fa-pen', route: '/admin/upload-blog', roles: ['admin'] },
          { id: 'upload-notes', label: 'Notes', icon: 'fas fa-file-pdf', route: '/admin/upload-notes', roles: ['admin'] },
          { id: 'success-stories', label: 'Success Stories', icon: 'fas fa-star', route: '/admin/create-success-story', roles: ['admin'] }
        ]
      }
    ],
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', route: '/student/student-dashboard', roles: ['student'] },
      { id: 'resume', label: 'Resume Builder', icon: 'fas fa-file-code', route: '/student/generate-ats-resume', roles: ['student'] },
      { id: 'exams', label: 'Exams', icon: 'fas fa-clipboard-list', route: '/student/exams', roles: ['student'], badge: 0 },
      { id: 'ai-practice', label: 'AI Practice', icon: 'fas fa-robot', route: '/student/home', roles: ['student'] },
      { id: 'doubts', label: 'Doubts', icon: 'fas fa-comments', route: '/student/syntaxshare', roles: ['student'] }
    ],
    trainer: [
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', route: '/trainer/trainer-dashboard', roles: ['trainer'] },
      { id: 'batches', label: 'My Batches', icon: 'fas fa-users', route: '/trainer/trainer-batches', roles: ['trainer'] },
      { id: 'exams', label: 'Exams', icon: 'fas fa-clipboard-list', route: '/trainer/trainer-exams', roles: ['trainer'] }
    ]
  };

  private readonly PUBLIC_ITEMS: NavItem[] = [
    { id: 'home', label: 'Home', icon: 'fas fa-home', route: '/landing-page' },
    { id: 'courses', label: 'Courses', icon: 'fas fa-book', route: '/courses' },
    { id: 'blog', label: 'Blog', icon: 'fas fa-blog', route: '/blog' },
    { id: 'careers', label: 'Careers', icon: 'fas fa-briefcase', route: '/careers' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope', route: '/contact' }
  ];

  constructor() {}

  setCurrentUser(role: string | null, userId: string | null): void {
    this.userRole.set(role);
    this.userId.set(userId);
    localStorage.setItem('userRole', role || '');
    localStorage.setItem('userId', userId || '');
  }

  getCurrentRole(): string | null {
    const stored = localStorage.getItem('userRole');
    if (stored) {
      this.userRole.set(stored);
    }
    return this.userRole();
  }

  getNavigationItems(): NavItem[] {
    const role = this.getCurrentRole();

    if (!role || !this.NAV_CONFIG[role]) {
      return this.PUBLIC_ITEMS;
    }

    const roleItems = this.NAV_CONFIG[role] || [];
    return [...this.PUBLIC_ITEMS, ...roleItems];
  }

  getNavigationItems$() {
    return of(this.getNavigationItems());
  }

  hasPermission(route: string): boolean {
    const role = this.getCurrentRole();
    if (!role || !this.NAV_CONFIG[role]) return true;

    const roleItems = this.NAV_CONFIG[role] || [];
    const checkItems = (items: NavItem[]): boolean => {
      for (const item of items) {
        if (item.route === route) return true;
        if (item.children && checkItems(item.children)) return true;
      }
      return false;
    };

    return checkItems(roleItems);
  }

  getAdminSidebarNav(): NavItem[] {
    return this.NAV_CONFIG['admin'] || [];
  }

  clearUser(): void {
    this.userRole.set(null);
    this.userId.set(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }
}