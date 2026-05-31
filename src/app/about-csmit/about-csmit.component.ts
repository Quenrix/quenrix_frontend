import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about-csmit',
  templateUrl: './about-csmit.component.html',
  styleUrls: ['./about-csmit.component.css']
})
export class AboutCsmitComponent {
  // Input property to manage modal visibility from parent
  @Input() isVisible: boolean = false;
  
  // Input for Trainer Data
  @Input() trainers: any[] = [];

  // NOTE: Placement Data Input has been removed as the section is no longer displayed.
  
  // Output event to notify parent component to close the modal
  @Output() closeModal = new EventEmitter<void>();

  // Data for Timeline
  timelineSteps = [
    { title: 'Learn', description: 'Master fundamentals with AI-guided personalized curriculums.', icon: '🧠' },
    { title: 'Build', description: 'Create large-scale capstone projects for your portfolio.', icon: '⚙️' },
    { title: 'Certify', description: 'Earn global certifications recognized by top tech companies.', icon: '📜' },
    { title: 'Get Hired', description: 'Ace interviews with our AI simulator and extensive network.', icon: '🚀' }
  ];

  // Data for Student Success
  successStories = [
    { name: 'Sarah J.', role: 'Software Engineer', company: 'Google', image: 'assets/sarah.jpg', quote: 'Quenrix transformed my career trajectory completely.' },
    { name: 'Rahul M.', role: 'Data Scientist', company: 'Microsoft', image: 'assets/rahul.jpg', quote: 'The AI mentorship felt like having a senior dev by my side.' },
    { name: 'Priya K.', role: 'Cloud Architect', company: 'Amazon', image: 'assets/priya.jpg', quote: 'Real-world projects gave me the confidence to ace my interviews.' }
  ];

  // Company Logos
  companies = ['Google', 'Microsoft', 'Amazon', 'Infosys'];

  constructor(private languageService: LanguageService) {}

  // Method to close the modal
  onClose() {
    this.closeModal.emit();
  }

  t(key: string, params?: Record<string, string | number>): string {
    return this.languageService.t(key, params);
  }
}
