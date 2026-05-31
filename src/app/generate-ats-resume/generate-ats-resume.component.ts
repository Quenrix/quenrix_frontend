import { Component, OnInit, signal, Input } from '@angular/core';
import { ResumeService, StudentInfo } from '../services/create-resume.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-generate-ats-resume',
  templateUrl: './generate-ats-resume.component.html',
  styleUrls: ['./generate-ats-resume.component.css']
})
export class GenerateAtsResumeComponent implements OnInit {

  @Input() isDashboardEmbed: boolean = false;

  resumeData: StudentInfo | null = null;
  skillColumn1: { name: string; level?: string }[] = [];
  skillColumn2: { name: string; level?: string }[] = [];

  isLoading = signal(true);
  atsScore = signal(0);
  selectedTemplate = signal('theme-classic');

  templates = [
    { id: 'theme-classic',   name: 'Classic'    },
    { id: 'theme-modern',    name: 'Modern Blue' },
    { id: 'theme-minimal',   name: 'Minimal'    },
    { id: 'theme-executive', name: 'Executive'  },
    { id: 'theme-tech',      name: 'Hacker'     },
    { id: 'theme-creative',  name: 'Creative'   },
    { id: 'theme-twocol',    name: 'Two Column' },
    { id: 'theme-startup',   name: 'Startup'    },
    { id: 'theme-academic',  name: 'Academic'   },
    { id: 'theme-elegant',   name: 'Elegant'    },
  ];

  constructor(
    private resumeService: ResumeService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('preferred_resume_theme');
    if (savedTheme) this.selectedTemplate.set(savedTheme);
    this.fetchResumeData();
  }

  // ─── Template & Score helpers ────────────────────────────────────────────────

  changeTemplate(themeId: string): void {
    this.selectedTemplate.set(themeId);
    localStorage.setItem('preferred_resume_theme', themeId);
  }

  /** Stroke offset for SVG ring (circumference = 2πr = 2π*22 ≈ 138.23) */
  getScoreDashOffset(): number {
    const circumference = 138.23;
    return circumference - (this.atsScore() / 100) * circumference;
  }

  getScoreColor(): string {
    const s = this.atsScore();
    if (s >= 80) return '#4B3F8F';
    if (s >= 50) return '#d97706';
    return '#dc2626';
  }

  // ─── ATS Score Algorithm ─────────────────────────────────────────────────────

  private calculateAtsScore(data: StudentInfo): void {
    let score = 0;

    // Personal info — 20 pts
    if (data.full_name)                    score += 5;
    if (data.email)                        score += 5;
    if (data.phone)                        score += 5;
    if (data.linkedin || data.portfolio)   score += 5;

    // Skills — 25 pts
    const sl = data.skills?.length ?? 0;
    if (sl >= 8)      score += 25;
    else if (sl >= 4) score += 18;
    else if (sl > 0)  score += 10;

    // Experience — 30 pts
    if (data.experience && data.experience.length > 0) {
      score += 25;
      if (data.experience[0].description?.length > 50) score += 5;
    }

    // Education — 15 pts
    if (data.education && data.education.length > 0) score += 15;

    // Projects — 15 pts
    const pl = data.projects?.length ?? 0;
    if (pl >= 2)     score += 15;
    else if (pl === 1) score += 10;

    this.atsScore.set(Math.min(score, 100));
  }

  // ─── Data fetching ───────────────────────────────────────────────────────────

  private fetchResumeData(): void {
    this.isLoading.set(true);

    // Mock data to bypass hanging backend
    setTimeout(() => {
      const mockData = {
        full_name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        phone: '9876543210',
        location: 'Mumbai, India',
        linkedin: 'https://linkedin.com/in/aaravsharma',
        portfolio: 'https://github.com/aaravsharma',
        experience_type: 'Experienced',
        skills: [
          { name: 'React', level: 'Expert' },
          { name: 'Node.js', level: 'Expert' },
          { name: 'TypeScript', level: 'Intermediate' },
          { name: 'CSS', level: 'Expert' }
        ],
        education: [
          { degree: 'B.Tech in Computer Science', institution: 'IIT Bombay', start_year: '2018', end_year: '2022', grade: '9.0 CGPA' }
        ],
        experience: [
          { title: 'Senior Developer', company: 'Tech Corp', start_date: '2022-06', end_date: 'Present', location: 'Mumbai', description: 'Lead a team of developers to build high-performance web applications.' }
        ],
        projects: [
          { title: 'E-commerce Platform', url: 'https://github.com/aaravsharma/ecommerce', tech_used: 'React, Node.js', description: 'A full-stack e-commerce platform with payment integration.' }
        ]
      };

      this.resumeData = this.transformApiData(mockData);
      this.divideSkillsIntoColumns(this.resumeData.skills);
      this.calculateAtsScore(this.resumeData);
      this.isLoading.set(false);
    }, 1000);
  }

  // ─── Data Transformation ─────────────────────────────────────────────────────

  private transformApiData(data: any): StudentInfo {
    // Deduplicate skills
    const uniqueSkillsMap = new Map<string, { name: string; level?: string }>();
    (data.skills || []).forEach((skill: any) => {
      const name: string = skill.name || skill.skillName || '';
      if (name && !uniqueSkillsMap.has(name.toLowerCase())) {
        uniqueSkillsMap.set(name.toLowerCase(), {
          name,
          level: skill.level || skill.proficiency || ''
        });
      }
    });

    return {
      full_name: data.full_name || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
      email: data.email || '',
      phone: data.phone || '',
      location: data.location || data.address || '',
      linkedin: data.linkedin || (data.linkedinId ? `https://linkedin.com/in/${data.linkedinId}` : ''),
      portfolio: data.portfolio || (data.githubId ? `https://github.com/${data.githubId}` : ''),
      experience_type: data.experience_type || (data.experience?.length > 0 ? 'Experienced' : 'Fresher'),

      education: (data.education || []).map((edu: any) => ({
        degree:      edu.degree || edu.qualification || '',
        institution: edu.institution || edu.university || '',
        start_year:  edu.start_year || edu.joined_on?.substring(0, 4) || '',
        end_year:    edu.end_year   || edu.left_on?.substring(0, 4) || 'Present',
        grade:       edu.grade      || (edu.marks ? `${edu.marks} ${edu.marking_system || ''}` : '')
      })),

      experience: (data.experience || []).map((exp: any) => ({
        title:       exp.title    || exp.position || '',
        company:     exp.company  || '',
        start_date:  exp.start_date || exp.joined_on?.substring(0, 7) || '',
        end_date:    exp.end_date   || exp.left_on?.substring(0, 7)   || 'Present',
        location:    exp.location || '',
        description: this.extractTextFromAny(exp.description || exp.worked_on || '')
      })),

      skills: Array.from(uniqueSkillsMap.values()),

      projects: (data.projects || []).map((proj: any) => ({
        title:       proj.title       || proj.projectName || '',
        url:         proj.url         || proj.githubLink  || '',
        tech_used:   this.extractTextFromAny(proj.tech_used || proj.techStack || '', 'techName'),
        description: this.extractTextFromAny(proj.description || proj.descriptions || '')
      }))
    };
  }

  private extractTextFromAny(val: any, preferredKey = ''): string {
    if (val === null || val === undefined) return '';
    if (typeof val === 'string') {
      const t = val.trim();
      if ((t.startsWith('[') && t.endsWith(']')) || (t.startsWith('{') && t.endsWith('}'))) {
        try { return this.extractTextFromAny(JSON.parse(t), preferredKey); } catch {}
      }
      return t === '[object Object]' ? '' : t;
    }
    if (Array.isArray(val)) {
      return val.map(i => this.extractTextFromAny(i, preferredKey)).filter(s => s.trim()).join('. ');
    }
    if (typeof val === 'object') {
      if (preferredKey && val[preferredKey]) return this.extractTextFromAny(val[preferredKey]);
      for (const key of ['worked_on', 'description', 'descriptions', 'techName', 'name', 'techname', 'title']) {
        if (val[key]) return this.extractTextFromAny(val[key]);
      }
      return Object.values(val).map(v => this.extractTextFromAny(v)).filter(s => s && s !== '[object Object]').join('. ');
    }
    return String(val);
  }

  private loadFallbackData(userId: string): void {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem('STUDENT_DATA') || window.sessionStorage.getItem('STUDENT_DATA');
      if (raw) {
        const parsed = JSON.parse(raw);
        const info = parsed.info || parsed;
        if (info && (info.education?.length > 0 || info.firstName)) {
          this.resumeData = this.transformApiData(info);
          this.divideSkillsIntoColumns(this.resumeData.skills);
          this.calculateAtsScore(this.resumeData);
          this.isLoading.set(false);
          return;
        }
      }
    }
    this.isLoading.set(false);
    if (!this.isDashboardEmbed) {
      window.location.href = 'setup-profile';
    }
  }

  // ─── UI helpers ──────────────────────────────────────────────────────────────

  private divideSkillsIntoColumns(skills: { name: string; level?: string }[]): void {
    if (skills?.length > 0) {
      const mid = Math.ceil(skills.length / 2);
      this.skillColumn1 = skills.slice(0, mid);
      this.skillColumn2 = skills.slice(mid);
    } else {
      this.skillColumn1 = [];
      this.skillColumn2 = [];
    }
  }

  getSkillNames(): string {
    return this.resumeData?.skills?.slice(0, 5).map(s => s.name).join(', ') || '';
  }

  /** Split pipe-separated description into bullet array */
  getExpBullets(desc: string): string[] {
    if (!desc) return [];
    return desc.split('|').map(b => b.trim()).filter(Boolean);
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  printResume(): void { window.print(); }

  backToDashboard(): void { window.location.href = 'student-dashboard'; }

  downloadResume(): void {
    const resumeEl = document.getElementById('resume-content');
    if (!resumeEl) return;

    const btn = document.getElementById('download-btn') as HTMLButtonElement;
    const originalText = btn?.innerHTML || '';
    if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...'; btn.disabled = true; }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
      this.generatePdf(resumeEl, () => {
        if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
      });
    };
    script.onerror = () => {
      alert('PDF library failed to load. Use browser Print → Save as PDF instead.');
      if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
    };
    document.body.appendChild(script);
  }

  private generatePdf(el: HTMLElement, callback: () => void): void {
    const html2pdf = (window as any).html2pdf;
    if (!html2pdf) return;

    const savedMargin = document.body.style.margin;
    const savedOverflow = document.body.style.overflow;
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    const filename = `${this.resumeData?.full_name?.replace(/\s+/g, '_') || 'Student'}_ATS_Resume.pdf`;

    html2pdf().from(el).set({
      margin: 0,
      filename,
      image:      { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: false, dpi: 300, letterRendering: true, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF:      { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save().then(() => {
      document.body.style.margin = savedMargin;
      document.body.style.overflow = savedOverflow;
      callback();
    });
  }
}