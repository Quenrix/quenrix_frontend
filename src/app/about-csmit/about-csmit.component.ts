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

  constructor(private languageService: LanguageService) {}

  // Method to close the modal
  onClose() {
    this.closeModal.emit();
  }

  t(key: string, params?: Record<string, string | number>): string {
    return this.languageService.t(key, params);
  }
}
