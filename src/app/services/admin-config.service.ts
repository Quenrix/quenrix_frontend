import { Injectable } from '@angular/core';

export interface AdminCard {
  title: string;
  subtitle: string;
  iconImage: string;
  buttonText: string;
  colorClass: string;
  route: string;
  targetTab?: string;
}

export interface NavLink {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export interface AdminConfig {
  SEARCH_PLACEHOLDER: string;
  HEADER_BUTTON: { label: string; icon: string };
  ADMIN_DETAILS: { name: string; role: string; profileUrl: string };
  SIDEBAR_LINKS: NavLink[];
  ADMIN_CARDS: AdminCard[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminConfigService {
  private readonly DEFAULT_CONFIG: AdminConfig = {
    SEARCH_PLACEHOLDER: "Search Users, Batches...",
    HEADER_BUTTON: {
      label: "View Reports",
      icon: "fas fa-chart-bar"
    },
    ADMIN_DETAILS: {
      name: 'Admin Head',
      role: 'System Administrator',
      profileUrl: 'https://placehold.co/80x80/4f46e5/ffffff?text=AD'
    },
    SIDEBAR_LINKS: [
      { id: 'dashboard', label: 'Home', icon: 'fas fa-home', route: '/admin/admin-panel' },
      { id: 'users', label: 'Users', icon: 'fas fa-users', route: '' },
      { id: 'courses', label: 'Courses', icon: 'fas fa-book-open', route: '' },
      { id: 'batches', label: 'Batches', icon: 'fas fa-graduation-cap', route: '' },
      { id: 'applicants', label: 'Applicants', icon: 'fas fa-file-alt', route: '/applicants' },
      { id: 'inquiries', label: 'Inquiries', icon: 'fas fa-question-circle', route: '/inquiries' }
    ],
    ADMIN_CARDS: [
      { title: 'Create New User', subtitle: 'Register new users and assign roles.', iconImage: 'new_user.png', buttonText: 'Create User', colorClass: 'indigo', route: '/admin/create-user' },
      { title: 'New Batch', subtitle: 'Manage batch start dates and capacity.', iconImage: 'batch.png', buttonText: 'Create Batch', colorClass: 'violet', route: '/admin/create-batch' },
      { title: 'New Course', subtitle: 'Define course structure and assign trainer.', iconImage: 'course.png', buttonText: 'Create Course', colorClass: 'violet', route: '/admin/create-course' },
      { title: 'Assign to Batch', subtitle: 'Map users to specific batches.', iconImage: 'assign-user.png', buttonText: 'Assign Users', colorClass: 'teal', route: '/admin/assign-user-to-batch' },
      { title: 'Create Exam', subtitle: 'Design and schedule new tests.', iconImage: 'exam.png', buttonText: 'Create Exam', colorClass: 'amber', route: '/admin/create-exam' },
      { title: 'Create Jobs', subtitle: 'Post new job openings.', iconImage: 'upload-job.png', buttonText: 'Manage Jobs', colorClass: 'red', route: '/admin/create-job' },
      { title: 'Upload Notes', subtitle: 'Upload lecture notes and materials.', iconImage: 'notes.png', buttonText: 'Upload Notes', colorClass: 'violet', route: '/admin/upload-notes' },
      { title: 'Success Stories', subtitle: 'Add student success stories.', iconImage: 'success-story.png', buttonText: 'Add Story', colorClass: 'teal', route: '/admin/create-success-story' },
      { title: 'Upload Blog', subtitle: 'Upload and manage blogs.', iconImage: 'blog.png', buttonText: 'Manage Blog', colorClass: 'red', route: '/admin/upload-blog' },
      { title: 'Careers', subtitle: 'Post internal job openings.', iconImage: 'career_web.png', buttonText: 'Website Careers', colorClass: 'indigo', route: '/admin/upload-careers', targetTab: 'upload-careers' }
    ]
  };

  constructor() {}

  getAdminConfig(): AdminConfig {
    return this.DEFAULT_CONFIG;
  }

  getSidebarLinks() {
    return this.DEFAULT_CONFIG.SIDEBAR_LINKS;
  }

  getAdminCards() {
    return this.DEFAULT_CONFIG.ADMIN_CARDS;
  }
}