import { Component, OnInit, inject } from '@angular/core';
import { UiStateService } from '../services/ui-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  private uiService = inject(UiStateService);
  private router = inject(Router);

  activeTab: 'javascript' | 'html' | 'css' = 'javascript';
  editorCode: string = '';
  consoleOutput: string = '';
  htmlPreview: string = '';

  private readonly snippets = {
    javascript: `// Dynamic course details calculation
const course_details = { name: 'Python for Data Science Masterclass', level: 'Beginner', duration: '12 weeks' };
console.log(\`Hello,\\nDeveloper!\\nExplore Python\\nfor Data Science\\nMasterclass...\`);`,

    html: `<div class="interactive-glow">
  <h3>Explore Angular 17+</h3>
  <p>Learn components, services, and routing dynamically!</p>
  <button class="live-sandbox-btn">Enrolling Now</button>
</div>`,

    css: `/* Custom card glows */
.interactive-glow {
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.4);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.2);
  transition: all 0.3s;
}
.interactive-glow h3 {
  color: #c084fc;
  margin-bottom: 0.5rem;
}
.interactive-glow p {
  color: #e2e8f0;
}
.live-sandbox-btn {
  background: #a855f7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.75rem;
}`
  };

  ngOnInit() {
    this.selectTab('javascript');
  }

  selectTab(tab: 'javascript' | 'html' | 'css') {
    this.activeTab = tab;
    this.editorCode = this.snippets[tab];
    this.runCode();
  }

  runCode() {
    this.consoleOutput = '';
    this.htmlPreview = '';
    
    if (this.activeTab === 'javascript') {
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => {
            logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '));
          }
        };
        
        // Execute javascript safely inside custom context
        const runFn = new Function('console', this.editorCode);
        runFn(customConsole);
        
        this.consoleOutput = logs.length > 0 ? logs.join('\n') : '[Success: No console logs returned]';
      } catch (err: any) {
        this.consoleOutput = `[Error]: ${err.message}`;
      }
    } else if (this.activeTab === 'html') {
      this.htmlPreview = this.editorCode;
    } else if (this.activeTab === 'css') {
      this.htmlPreview = `<style>${this.editorCode}</style>
<div class="interactive-glow">
  <h3>CSS Glow Active</h3>
  <p>Your styles have been injected successfully!</p>
  <button class="live-sandbox-btn">Styled Button</button>
</div>`;
    }
  }

  onAboutClick(): void {
    this.uiService.triggerAction('open-about');
  }
}


