import { Component, HostListener, inject } from '@angular/core';
import { UiStateService } from '../services/ui-state.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  private uiService = inject(UiStateService);
  private languageService = inject(LanguageService);

  isScrolled = false;
  isChatOpen = false; 

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  handleAction(action: string) {
    this.uiService.triggerAction(action);

    if (action.startsWith('navigate') || action === 'open-courses') {
      this.scrollToTop();
    }
  }

  openExternal(url: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) {
      window.location.href = url;
    }
  }

  t(key: string): string {
    return this.languageService.t(key);
  }
}