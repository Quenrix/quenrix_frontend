import { Injectable } from '@angular/core';
import { htmlNotes } from './notes-data/html-notes.data';
import { cssNotes } from './notes-data/css-notes.data';
import { jsNotes } from './notes-data/js-notes.data';
import { reactNotes } from './notes-data/react-notes.data';
import { nodeNotes } from './notes-data/node-notes.data';
import { sqlNotes } from './notes-data/sql-notes.data';
import { mongodbNotes } from './notes-data/mongodb-notes.data';
import { Observable, of } from 'rxjs';

export interface NoteChapter {
  id: string;
  title: string;
  content: string;
  estimatedMinutes: number;
}

export interface NoteTopic {
  id: string;
  title: string;
  description: string;
  icon: string; // e.g. class name for an icon, or URL
  chapters: NoteChapter[];
}

export interface UserProgress {
  topicId: string;
  lastChapterId: string;
  bookmarkedChapters: string[]; // Array of chapter IDs
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionalNotesService {

  private readonly topics: NoteTopic[] = [
    htmlNotes,
    cssNotes,
    jsNotes,
    reactNotes,
    nodeNotes,
    sqlNotes,
    mongodbNotes
  ];

  constructor() { }

  getAllTopics(): Observable<NoteTopic[]> {
    return of(this.topics);
  }

  getTopicById(id: string): Observable<NoteTopic | undefined> {
    return of(this.topics.find(t => t.id === id));
  }

  searchNotes(query: string): Observable<{topicId: string, chapter: NoteChapter}[]> {
    const q = query.toLowerCase();
    const results: {topicId: string, chapter: NoteChapter}[] = [];
    
    this.topics.forEach(topic => {
      topic.chapters.forEach(chapter => {
        if (chapter.title.toLowerCase().includes(q) || chapter.content.toLowerCase().includes(q)) {
          results.push({ topicId: topic.id, chapter });
        }
      });
    });

    return of(results);
  }

  // --- Progress & Bookmarks (LocalStorage) ---

  getProgress(topicId: string): UserProgress {
    const raw = localStorage.getItem(`progress_${topicId}`);
    if (raw) {
      return JSON.parse(raw);
    }
    return {
      topicId,
      lastChapterId: '',
      bookmarkedChapters: []
    };
  }

  saveProgress(progress: UserProgress): void {
    localStorage.setItem(`progress_${progress.topicId}`, JSON.stringify(progress));
  }

  toggleBookmark(topicId: string, chapterId: string): void {
    const progress = this.getProgress(topicId);
    const index = progress.bookmarkedChapters.indexOf(chapterId);
    if (index > -1) {
      progress.bookmarkedChapters.splice(index, 1);
    } else {
      progress.bookmarkedChapters.push(chapterId);
    }
    this.saveProgress(progress);
  }

  isBookmarked(topicId: string, chapterId: string): boolean {
    const progress = this.getProgress(topicId);
    return progress.bookmarkedChapters.includes(chapterId);
  }
}
