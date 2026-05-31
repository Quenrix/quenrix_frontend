import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csmit-resume';
  isScrolled = false;
  isChatOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 300;
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
