import {
  Component, OnInit, OnDestroy, ElementRef,
  ViewChild, AfterViewInit, HostListener, Renderer2
} from '@angular/core';

interface Feature {
  id: string;
  title: string;
  desc: string;
  tag: string;
  stat: string;
  statLabel: string;
  accentVar: string;
}

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss']
})
export class FeaturesSectionComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sectionRef') sectionRef!: ElementRef;
  @ViewChild('mouseGlow') mouseGlowRef!: ElementRef;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  headerVisible = false;
  cardsVisible  = false;
  statsVisible  = false;
  ctaVisible    = false;

  private observer!: IntersectionObserver;
  private animFrame!: number;
  private particles: any[] = [];
  private ctx!: CanvasRenderingContext2D;

  features: Feature[] = [
    {
      id: 'ai',
      title: '24/7 AI Mentor Support',
      desc: 'Get personalized career guidance, code reviews, and interview prep from our advanced AI mentor anytime.',
      tag: 'GPT-4 Powered', stat: '24/7', statLabel: 'Availability',
      accentVar: '--c: #8B5CF6'
    },
    {
      id: 'notes',
      title: '500+ Premium Notes',
      desc: 'Access curated, high-quality notes covering DSA, System Design, and core CS subjects written by experts.',
      tag: 'Verified Content', stat: '500+', statLabel: 'Notes Available',
      accentVar: '--c: #22D3EE'
    },
    {
      id: 'interview',
      title: '10K+ Mock Interviews Taken',
      desc: 'Practice with AI-driven mock interviews that simulate real company rounds and provide detailed feedback.',
      tag: 'Real-time Analysis', stat: '10K+', statLabel: 'Interviews Conducted',
      accentVar: '--c: #EC4899'
    },
    {
      id: 'coding',
      title: '1000+ DSA Problems',
      desc: 'Solve handpicked data structures and algorithms problems ranging from beginner to advanced levels.',
      tag: 'Smart IDE', stat: '1000+', statLabel: 'Practice Problems',
      accentVar: '--c: #F59E0B'
    },
    {
      id: 'resume',
      title: 'ATS Resume Templates',
      desc: 'Build professional, ATS-friendly resumes that stand out to recruiters and pass automated screenings.',
      tag: 'AI Optimization', stat: 'Top 1%', statLabel: 'ATS Score',
      accentVar: '--c: #10B981'
    },
    {
      id: 'placement',
      title: '94% Placement Assistance',
      desc: 'Get dedicated support for placements, including company-specific preparation and job referrals.',
      tag: 'Hiring Partners', stat: '94%', statLabel: 'Placement Rate',
      accentVar: '--c: #3B82F6'
    },
    {
      id: 'projects',
      title: 'Real Industry Projects',
      desc: 'Work on real-world projects with modern tech stacks to build a strong portfolio that impresses employers.',
      tag: 'Live Deployment', stat: 'Real', statLabel: 'World Experience',
      accentVar: '--c: #F97316'
    },
    {
      id: 'cert',
      title: 'Verified Skill Certificates',
      desc: 'Earn certificates verified by industry partners to showcase your skills and boost your credibility.',
      tag: 'Shareable', stat: 'Verified', statLabel: 'Certifications',
      accentVar: '--c: #A78BFA'
    }
  ];

  stats = [
    { number: '50K+', label: 'Students Trained' },
    { number: '94%',  label: 'Placement Rate'   },
    { number: '200+', label: 'Hiring Partners'   },
    { number: '4.9★', label: 'Avg Rating'        },
    { number: '24/7', label: 'AI Support'        },
  ];

  // --- Calculator State ---
  selectedCourse: string = 'fullstack';
  experienceYears: number = 0;
  estimatedSalary: number = 5;
  potentialRole: string = 'Junior Engineer / Associate';
  hiringCompanies: string = 'Infosys, Capgemini, TCS, Amazon';
  requiredSkills: string[] = ['React', 'Node.js', 'Express', 'MongoDB'];

  ngOnInit(): void {
    this.onCalculatorChange();
  }

  onCalculatorChange() {
    let base = 5;
    let multiplier = 1.8;
    let max = 25;
    
    if (this.selectedCourse === 'fullstack') {
      base = 5.2; multiplier = 1.95; max = 24.8;
      this.hiringCompanies = 'Infosys, Capgemini, TCS, Amazon';
      this.requiredSkills = ['React', 'Node.js', 'Express', 'MongoDB', 'System Design'];
    } else if (this.selectedCourse === 'datascience') {
      base = 6.0; multiplier = 2.2; max = 28.5;
      this.hiringCompanies = 'Google, Microsoft, Accenture, IBM';
      this.requiredSkills = ['Python', 'SQL', 'PyTorch', 'Pandas', 'PowerBI'];
    } else if (this.selectedCourse === 'cybersecurity') {
      base = 5.8; multiplier = 2.05; max = 26.2;
      this.hiringCompanies = 'PwC, Deloitte, Cisco, CrowdStrike';
      this.requiredSkills = ['Ethical Hacking', 'Penetration Testing', 'Network Security', 'SIEM'];
    } else if (this.selectedCourse === 'cloud') {
      base = 6.4; multiplier = 2.5; max = 31.5;
      this.hiringCompanies = 'AWS, Azure, Oracle, Netflix';
      this.requiredSkills = ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'];
    }
    
    // Calculate salary
    this.estimatedSalary = Math.min(base + (this.experienceYears * multiplier), max);
    // Standardize to 1 decimal place
    this.estimatedSalary = Math.round(this.estimatedSalary * 10) / 10;
    
    // Determine role
    if (this.experienceYears <= 2) {
      this.potentialRole = 'Junior Engineer / Associate';
    } else if (this.experienceYears <= 5) {
      this.potentialRole = 'Mid-level Engineer / Consultant';
    } else if (this.experienceYears <= 8) {
      this.potentialRole = 'Senior Software Engineer / Tech Lead';
    } else {
      this.potentialRole = 'Lead Solutions Architect / Engineering Manager';
    }
  }

  ngAfterViewInit(): void {
    this.initObserver();
    this.initParticles();
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.headerVisible = true;
          setTimeout(() => this.cardsVisible  = true, 250);
          setTimeout(() => this.statsVisible  = true, 800);
          setTimeout(() => this.ctaVisible    = true, 1100);
          this.observer.disconnect();
        }
      });
    }, { threshold: 0.06 });

    if (this.sectionRef?.nativeElement) {
      this.observer.observe(this.sectionRef.nativeElement);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const glow = this.mouseGlowRef?.nativeElement;
    if (!glow) return;
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }

  onCardMouseMove(e: MouseEvent, card: HTMLElement): void {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotX   = ((y - cy) / cy) * -8;
    const rotY   = ((x - cx) / cx) *  8;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.025)`;

    const glow = card.querySelector('.card-inner-glow') as HTMLElement;
    if (glow) {
      const xPct = (x / rect.width)  * 100;
      const yPct = (y / rect.height) * 100;
      glow.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, var(--c, #8B5CF6), transparent 60%)`;
    }
  }

  onCardMouseLeave(card: HTMLElement): void {
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
    const glow = card.querySelector('.card-inner-glow') as HTMLElement;
    if (glow) glow.style.background = '';
  }

  private initParticles(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas(canvas);

    const colors = ['#8B5CF6','#6D28D9','#A78BFA','#4F46E5','#22D3EE'];
    this.particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    this.animateParticles(canvas);
  }

  private resizeCanvas(canvas: HTMLCanvasElement): void {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private animateParticles(canvas: HTMLCanvasElement): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    this.animFrame = requestAnimationFrame(() => this.animateParticles(canvas));
  }

  @HostListener('window:resize')
  onResize(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) this.resizeCanvas(canvas);
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}
