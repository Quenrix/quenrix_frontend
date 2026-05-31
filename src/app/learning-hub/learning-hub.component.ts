import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning-hub',
  templateUrl: './learning-hub.component.html',
  styleUrls: ['./learning-hub.component.css']
})
export class LearningHubComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  // Mock Data
  stats = [
    { title: 'Active Courses', value: 4, icon: 'fas fa-book-open', trend: '+1 this month' },
    { title: 'Total Students', value: 128, icon: 'fas fa-user-graduate', trend: '+12 new' },
    { title: 'Pending Reviews', value: 24, icon: 'fas fa-clipboard-list', trend: '8 urgent' },
    { title: 'Upcoming Classes', value: 3, icon: 'fas fa-clock', trend: 'Today' }
  ];

  courses = [
    { name: 'Advanced React Architecture', progress: 75, students: 45, batch: 'Batch A' },
    { name: 'Node.js Backend Masterclass', progress: 40, students: 38, batch: 'Batch B' },
    { name: 'TypeScript & Modern JS', progress: 90, students: 25, batch: 'Batch C' },
    { name: 'UI/UX Design Systems', progress: 15, students: 20, batch: 'Batch D' }
  ];

  insights = [
    'Students are struggling in React Hooks in Batch A.',
    'Schedule a revision session for Node.js async patterns.',
    '12 students have been inactive this week across all batches.'
  ];

  resources = [
    { name: 'React Hooks Cheat Sheet.pdf', type: 'PDF', size: '1.2 MB' },
    { name: 'Backend Architecture Design.png', type: 'Image', size: '3.4 MB' },
    { name: 'Week 4 Lecture Notes.docx', type: 'Doc', size: '850 KB' }
  ];

  sessions = [
    { time: '10:00 AM', batch: 'Batch A', topic: 'Custom Hooks Deep Dive', link: '#' },
    { time: '02:00 PM', batch: 'Batch B', topic: 'Express Middleware', link: '#' },
    { time: '04:30 PM', batch: 'Batch C', topic: 'TS Interfaces vs Types', link: '#' }
  ];

  addModule() {
    this.courses.push({
      name: 'New Module ' + (this.courses.length + 1),
      progress: 0,
      students: 0,
      batch: 'New Batch'
    });
  }

  downloadFile(file: any) {
    alert('Downloading ' + file.name + '...');
  }

  deleteModule(index: number) {
    this.courses.splice(index, 1);
  }

  uploadResource() {
    alert('Opening upload dialog...');
  }

  joinSession(session: any) {
    alert('Joining session: ' + session.topic);
  }
}
