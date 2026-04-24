import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiStateService } from '../services/ui-state.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private uiService = inject(UiStateService);
  private uiSubscription?: Subscription;

  // Default view is 'home'
  currentView: string = 'home';
  isAboutModalOpen = false;

  trainers = [
    { name: 'Ravi Verma', specialization: 'Lead Data Scientist', experience: '12 Yrs', rating: '4.9', image: 'https://placehold.co/80x80/2980b9/ffffff?text=RV' },
    { name: 'Sneha Patel', specialization: 'Full Stack Architect', experience: '10 Yrs', rating: '4.8', image: 'https://placehold.co/80x80/8e44ad/ffffff?text=SP' },
    { name: 'Arjun Singh', specialization: 'Cyber Security Expert', experience: '15 Yrs', rating: '4.7', image: 'https://placehold.co/80x80/27ae60/ffffff?text=AS' }
  ];

  ngOnInit(): void {
    this.uiSubscription = this.uiService.action$.subscribe((payload) => {
      if (payload.action === 'open-about') {
        this.openAboutModal();
      }
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
    document.body.style.overflow = 'auto';
  }

  // Method to handle view switching
  onPageChange(view: string) {
    this.currentView = view;
    // Scroll to top smoothly when view changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openAboutModal(): void {
    this.isAboutModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeAboutModal(): void {
    this.isAboutModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}