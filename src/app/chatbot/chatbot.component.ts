import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { catchError, finalize, of, timeout } from 'rxjs';
import { Subscription } from 'rxjs';
import { LanguageCode, LanguageService } from '../services/language.service';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('chatBox') chatBox?: ElementRef<HTMLDivElement>;

  quickQuestions: string[] = [];
  currentLanguage: LanguageCode = 'en';

  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  userInput: string = '';
  isTyping = false;
  private languageSubscription?: Subscription;

  constructor(
    private chatService: ChatService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.currentLanguage;
    this.refreshLocalizedContent();

    this.languageSubscription = this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
      this.refreshLocalizedContent();
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  sendMessage() {
    const question = this.userInput.trim();
    if (!question || this.isTyping) return;

    this.messages.push({ text: question, sender: 'user' });
    this.userInput = '';
    this.isTyping = true;

    this.chatService.sendMessage(question)
      .pipe(
        timeout(12000),
        catchError((error) => {
          console.error('Chat API error:', error);
          return of({ reply: this.getFallbackReply(question) });
        }),
        finalize(() => {
          this.isTyping = false;
        })
      )
      .subscribe(response => {
        const reply = this.extractReply(response, question);
        this.messages.push({ text: reply, sender: 'bot' });
      });
  }

  askQuickQuestion(question: string): void {
    if (this.isTyping) return;
    this.userInput = question;
    this.sendMessage();
  }

  t(key: string): string {
    return this.languageService.t(key);
  }

  private extractReply(response: any, question: string): string {
    if (typeof response === 'string' && response.trim()) {
      return response.trim();
    }

    if (response && typeof response === 'object') {
      const possibleReply =
        response.reply ||
        response.response ||
        response.answer ||
        response.message ||
        response.text;

      if (typeof possibleReply === 'string' && possibleReply.trim()) {
        return possibleReply.trim();
      }
    }

    return this.getFallbackReply(question);
  }

  private getFallbackReply(question: string): string {
    const q = question.toLowerCase();

    if (q.includes('course') || q.includes('program')) {
      return this.t('chat.fallback.course');
    }
    if (q.includes('demo') || q.includes('class')) {
      return this.t('chat.fallback.demo');
    }
    if (q.includes('placement') || q.includes('job')) {
      return this.t('chat.fallback.placement');
    }
    if (q.includes('notes') || q.includes('study material')) {
      return this.t('chat.fallback.notes');
    }

    return this.t('chat.fallback.default');
  }

  private refreshLocalizedContent(): void {
    this.quickQuestions = [
      this.t('chat.quickQ1'),
      this.t('chat.quickQ2'),
      this.t('chat.quickQ3'),
      this.t('chat.quickQ4')
    ];

    if (this.messages.length === 0) {
      this.messages = [{ text: this.t('chat.welcome'), sender: 'bot' }];
      return;
    }

    const hasUserMessages = this.messages.some((message) => message.sender === 'user');
    if (!hasUserMessages && this.messages[0]?.sender === 'bot') {
      this.messages[0] = { text: this.t('chat.welcome'), sender: 'bot' };
    }
  }

  private scrollToBottom(): void {
    if (!this.chatBox?.nativeElement) return;
    const el = this.chatBox.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
}