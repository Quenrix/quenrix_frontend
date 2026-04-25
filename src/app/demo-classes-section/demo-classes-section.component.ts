import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface DemoVideo {
  title: string;
  instructor: string;
  duration: string;
  thumbnailUrl: string;
  youtubeVideoId: string;
  shortDescription: string;
  fullDescription: string;
}

@Component({
  selector: 'app-demo-classes-section',
  templateUrl: './demo-classes-section.component.html',
  styleUrls: ['./demo-classes-section.component.css']
})
export class DemoClassesSectionComponent implements OnInit, OnDestroy {
  isModalOpen = false;
  selectedVideoUrl: SafeResourceUrl = '';
  readonly expandedCards: Record<string, boolean> = {};
  readonly flippedCards: Record<string, boolean> = {};

  private readonly ultimateFallbackThumbnail =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23111827'/%3E%3Cstop offset='100%25' stop-color='%232a1f5f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='360' fill='url(%23g)'/%3E%3Ccircle cx='320' cy='180' r='38' fill='white' fill-opacity='0.18'/%3E%3Cpolygon points='308,160 308,200 342,180' fill='white'/%3E%3Ctext x='320' y='240' text-anchor='middle' fill='%23d6d6ff' font-family='Arial, sans-serif' font-size='18'%3EVideo preview loading%3C/text%3E%3C/svg%3E";

  demoVideos: DemoVideo[] = [
    {
      title: 'C++ Placement Course',
      instructor: 'CodeHelp (Love Babbar)',
      duration: '1:20:00',
      thumbnailUrl: 'https://img.youtube.com/vi/WQoB2z67hvY/maxresdefault.jpg',
      youtubeVideoId: 'WQoB2z67hvY',
      shortDescription: 'Master C++ fundamentals, DSA logic, and coding interview patterns from scratch.',
      fullDescription: 'This demo introduces structured C++ learning, problem-solving workflow, and placement-focused strategies used in top tech interviews.'
    },
    {
      title: 'Python Full Course (100 Days)',
      instructor: 'CodeWithHarry',
      duration: '12:00:00',
      thumbnailUrl: 'https://img.youtube.com/vi/7wnove7K-ZQ/maxresdefault.jpg',
      youtubeVideoId: '7wnove7K-ZQ',
      shortDescription: 'Learn Python with practical projects, automation basics, and real coding practice.',
      fullDescription: 'Get a preview of Python essentials, clean coding style, and how the 100-day roadmap builds confidence for development and interviews.'
    },
    {
      title: 'Java Alpha Placement Course',
      instructor: 'Apna College',
      duration: '15:30',
      thumbnailUrl: 'https://img.youtube.com/vi/yRpLlJmRo2w/maxresdefault.jpg',
      youtubeVideoId: 'yRpLlJmRo2w',
      shortDescription: 'Strong Java foundations with OOP, backend mindset, and placement preparation.',
      fullDescription: 'Explore Java core concepts, object-oriented design, and interview-ready thinking with an industry-aligned teaching approach.'
    },
    {
      title: 'Complete C Language Tutorial',
      instructor: 'CodeWithHarry',
      duration: '15:00:00',
      thumbnailUrl: 'https://img.youtube.com/vi/ZSPZob_1w9E/maxresdefault.jpg',
      youtubeVideoId: 'ZSPZob_1w9E',
      shortDescription: 'Start programming logic with C syntax, memory basics, and structured coding.',
      fullDescription: 'This demo covers core C concepts, practical problem building, and how C helps create strong programming fundamentals.'
    },
    {
      title: 'DSA Series (C++)',
      instructor: 'Apna College',
      duration: '50:10',
      thumbnailUrl: 'https://img.youtube.com/vi/VTLCoHnyACE/maxresdefault.jpg',
      youtubeVideoId: 'VTLCoHnyACE',
      shortDescription: 'Understand arrays, recursion, and algorithm patterns for coding rounds.',
      fullDescription: 'Get a glimpse of DSA teaching style with clear intuition, visual dry-runs, and pattern-based interview preparation.'
    },
    {
      title: 'Web Dev Roadmap 2024',
      instructor: 'CodeHelp (Love Babbar)',
      duration: '20:15',
      thumbnailUrl: 'https://img.youtube.com/vi/xWBb7d5f0yI/maxresdefault.jpg',
      youtubeVideoId: 'xWBb7d5f0yI',
      shortDescription: 'A clear path to become a full-stack web developer with modern stack guidance.',
      fullDescription: 'The demo explains what to learn first, what to avoid, and how to build portfolio projects that increase hiring chances.'
    },
    {
      title: 'React JS Full Course',
      instructor: 'CodeWithHarry',
      duration: '18:45',
      thumbnailUrl: 'https://img.youtube.com/vi/-mJFZp84TIY/maxresdefault.jpg',
      youtubeVideoId: '-mJFZp84TIY',
      shortDescription: 'Build modern frontend apps using React components, hooks, and reusable UI logic.',
      fullDescription: 'See how React concepts are taught step-by-step with practical examples, project flow, and deployment-ready coding habits.'
    },
    {
      title: 'HTML One Shot (Web Dev)',
      instructor: 'Apna College',
      duration: '2:30:00',
      thumbnailUrl: 'https://img.youtube.com/vi/HcOc7P5BMi4/maxresdefault.jpg',
      youtubeVideoId: 'HcOc7P5BMi4',
      shortDescription: 'Perfect beginner start for webpage structure, semantic tags, and layout basics.',
      fullDescription: 'This one-shot demo walks through HTML essentials and shows how beginners can quickly create structured, professional webpages.'
    }
  ];

  readonly fallbackStage: Record<string, number> = {};

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.demoVideos.forEach((video) => {
      this.fallbackStage[video.youtubeVideoId] = 0;
      this.expandedCards[video.youtubeVideoId] = false;
      this.flippedCards[video.youtubeVideoId] = false;
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  openModal(videoId: string): void {
    const unsafeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedVideoUrl = '';
    document.body.style.overflow = 'auto';
  }

  toggleReadMore(videoId: string, event: Event): void {
    event.stopPropagation();
    this.expandedCards[videoId] = !this.expandedCards[videoId];

    if (!this.expandedCards[videoId]) {
      this.flippedCards[videoId] = false;
    }
  }

  toggleFlip(videoId: string, event: Event): void {
    event.stopPropagation();
    this.flippedCards[videoId] = !this.flippedCards[videoId];
  }

  showVideoFromCard(videoId: string, event: Event): void {
    event.stopPropagation();
    this.openModal(videoId);
  }

  onThumbnailError(event: Event, video: DemoVideo): void {
    const image = event.target as HTMLImageElement;
    const stage = this.fallbackStage[video.youtubeVideoId] ?? 0;

    if (stage === 0) {
      this.fallbackStage[video.youtubeVideoId] = 1;
      image.src = `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`;
      return;
    }

    if (stage === 1) {
      this.fallbackStage[video.youtubeVideoId] = 2;
      image.src = this.ultimateFallbackThumbnail;
    }
  }
}
