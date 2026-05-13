import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

export interface SidebarLink {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  @Input() activeTab: string = 'dashboard';
  @Output() navClick = new EventEmitter<{route: string, tabId: string}>();

  sidebarLinks: SidebarLink[] = [
    { id: 'users', label: 'Users', icon: 'fas fa-users', route: '/users' },
    { id: 'courses', label: 'Courses', icon: 'fas fa-book-open', route: '/courses' },
    { id: 'batches', label: 'Batches', icon: 'fas fa-graduation-cap', route: '/batches' },
    { id: 'applicants', label: 'Applicants', icon: 'fas fa-file-alt', route: '/applicants' },
    { id: 'inquiries', label: 'Inquiries', icon: 'fas fa-question-circle', route: '/inquiries' }
  ];

  constructor(private router: Router) {}

  onNavigate(link: SidebarLink) {
    this.navClick.emit({ route: link.route, tabId: link.id });
  }
}
