import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ProfessionalNotesService, NoteTopic, NoteChapter } from '../services/professional-notes.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notes-viewer',
  templateUrl: './notes-viewer.component.html',
  styleUrls: ['./notes-viewer.component.css']
})
export class NotesViewerComponent implements OnInit, OnDestroy {
  topics: NoteTopic[] = [];
  currentTopic: NoteTopic | null = null;
  currentChapter: NoteChapter | null = null;
  
  isSidebarOpen = true;
  searchQuery = '';
  searchResults: {topicId: string, chapter: NoteChapter}[] = [];

  private route = inject(ActivatedRoute);
  private location = inject(Location);

  constructor(public notesService: ProfessionalNotesService) {}

  ngOnInit(): void {
    this.notesService.getAllTopics().subscribe(t => {
      this.topics = t;
      
      this.route.queryParams.subscribe(params => {
        const topicId = params['topic'];
        if (topicId) {
          const found = this.topics.find(x => x.id.toLowerCase() === topicId.toLowerCase());
          if (found) {
            this.selectTopic(found);
            const chapId = params['chapter'];
            if (chapId) {
              const chap = found.chapters.find(c => c.id === chapId);
              if (chap) {
                this.currentChapter = chap;
              }
            }
            return;
          }
        }
        
        if (this.topics.length > 0) {
          this.selectTopic(this.topics[0]);
        }
      });
    });
    
    // Smooth scrolling style fix
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  ngOnDestroy(): void {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goBack() {
    this.location.back();
  }

  selectTopic(topic: NoteTopic) {
    this.currentTopic = topic;
    const progress = this.notesService.getProgress(topic.id);
    
    if (progress.lastChapterId) {
      const chap = topic.chapters.find(c => c.id === progress.lastChapterId);
      if (chap) {
        this.currentChapter = chap;
        return;
      }
    }
    
    if (topic.chapters.length > 0) {
      this.currentChapter = topic.chapters[0];
    }
  }

  selectChapter(chapter: NoteChapter) {
    this.currentChapter = chapter;
    if (this.currentTopic) {
      const progress = this.notesService.getProgress(this.currentTopic.id);
      progress.lastChapterId = chapter.id;
      this.notesService.saveProgress(progress);
    }
    this.scrollToTop();
  }

  scrollToTop() {
    const contentArea = document.querySelector('.notes-content-area');
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
  }

  getPrevChapter(): NoteChapter | null {
    if (!this.currentTopic || !this.currentChapter) return null;
    const idx = this.currentTopic.chapters.findIndex(c => c.id === this.currentChapter!.id);
    return idx > 0 ? this.currentTopic.chapters[idx - 1] : null;
  }

  getNextChapter(): NoteChapter | null {
    if (!this.currentTopic || !this.currentChapter) return null;
    const idx = this.currentTopic.chapters.findIndex(c => c.id === this.currentChapter!.id);
    return idx < this.currentTopic.chapters.length - 1 ? this.currentTopic.chapters[idx + 1] : null;
  }

  toggleBookmark() {
    if (this.currentTopic && this.currentChapter) {
      this.notesService.toggleBookmark(this.currentTopic.id, this.currentChapter.id);
    }
  }

  isCurrentBookmarked(): boolean {
    if (!this.currentTopic || !this.currentChapter) return false;
    return this.notesService.isBookmarked(this.currentTopic.id, this.currentChapter.id);
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }
    this.notesService.searchNotes(this.searchQuery).subscribe(res => {
      this.searchResults = res;
    });
  }

  selectSearchResult(result: {topicId: string, chapter: NoteChapter}) {
    const topic = this.topics.find(t => t.id === result.topicId);
    if (topic) {
      this.currentTopic = topic;
      this.currentChapter = result.chapter;
      this.searchQuery = '';
      this.searchResults = [];
      this.scrollToTop();
    }
  }
}
