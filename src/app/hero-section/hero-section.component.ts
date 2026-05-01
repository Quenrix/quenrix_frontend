import { Component, inject } from '@angular/core';
import { UiStateService } from '../services/ui-state.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  private uiService = inject(UiStateService);

  // Dummy code snippet for the code editor card
  codeSnippet = `// Create your first HTML page
function displayMessage() {
  const greeting = "Hello, Developer!";
  console.log(greeting);
  
  return greeting;
}

displayMessage();`;

  // Navigation to different sections
  onStartAssessment(): void {
    this.uiService.triggerAction('open-about');
  }
}
