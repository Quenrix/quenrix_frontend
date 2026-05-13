import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface CodexaRequest {
  message: string;
  question?: string;
  code?: string;
}

export interface CodexaResponse {
  reply: string;
  type?: 'question' | 'chat';
}

@Injectable({
  providedIn: 'root'
})
export class CodexaChatService {

  // ✅ FIXED: Hardcoded localhost hata diya — ab environment se URL aayega
  private apiUrl = `${environment.apiBaseUrl}/codexa/chat/`;

  constructor(private http: HttpClient) {}

  sendMessage(payload: CodexaRequest): Observable<CodexaResponse> {
    return this.http.post<CodexaResponse>(this.apiUrl, payload).pipe(
      catchError((error) => {
        const fallbackReply = this.buildFallbackReply(payload);

        if (fallbackReply) {
          return of<CodexaResponse>({
            reply: fallbackReply,
            type: 'question'
          });
        }

        return throwError(() => error);
      })
    );
  }

  private buildFallbackReply(payload: CodexaRequest): string {
    const requestedCount = this.extractQuestionCount(`${payload.message || ''} ${payload.question || ''}`);
    const topic = (payload.question || payload.message || 'Programming').trim();
    const normalized = topic.toLowerCase();

    if (!topic) {
      return '';
    }

    const header = `## ${requestedCount} Coding Practice Questions\n\nTopic: **${topic}**\n`;
    const questions = Array.from({ length: requestedCount }, (_, index) => {
      const questionNumber = index + 1;
      return this.buildQuestionByTopic(normalized, topic, questionNumber);
    }).join('\n\n');

    return `${header}\n${questions}`;
  }

  private extractQuestionCount(text: string): number {
    const countMatch = text.toLowerCase().match(/(\d{1,2})\s*(questions?|qns?|ques)/);
    const count = countMatch ? Number(countMatch[1]) : 10;
    return Math.min(50, Math.max(1, Number.isFinite(count) ? count : 10));
  }

  private buildQuestionByTopic(normalizedTopic: string, originalTopic: string, index: number): string {
    if (normalizedTopic.includes('angular')) {
      return [
        `### Question ${index}`,
        `Create an Angular component scenario for ${originalTopic}.`,
        '- Use lifecycle hooks with a practical use-case.',
        '- Include expected output/state changes.'
      ].join('\n');
    }

    if (normalizedTopic.includes('sql')) {
      return [
        `### Question ${index}`,
        `Write an SQL query problem based on ${originalTopic}.`,
        '- Require JOIN/GROUP BY in the solution.',
        '- Mention expected columns in output.'
      ].join('\n');
    }

    if (normalizedTopic.includes('dsa') || normalizedTopic.includes('tree') || normalizedTopic.includes('array')) {
      return [
        `### Question ${index}`,
        `Solve a DSA problem on ${originalTopic} with an optimized approach.`,
        '- Add input/output examples.',
        '- Mention time and space complexity.'
      ].join('\n');
    }

    return [
      `### Question ${index}`,
      `Design a coding task on ${originalTopic}.`,
      '- Define constraints and edge cases.',
      '- Ask for a clean and testable implementation.'
    ].join('\n');
  }
}
