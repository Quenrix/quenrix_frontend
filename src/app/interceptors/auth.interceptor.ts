import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // This flag prevents multiple refresh calls at the same time.
  // Example: if 3 API calls fail with 401 simultaneously, only 1 refresh request goes out.
  private isRefreshing: boolean = false;

  // This subject holds the new access token once the refresh is complete.
  // Other waiting requests subscribe to this and retry with the new token.
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');

    // Do NOT attach the Authorization header for AWS S3 URLs.
    // S3 pre-signed URLs already contain authentication in the URL itself.
    // Adding a Bearer token header will cause S3 to return a 400 error.
    const isS3Url =
      request.url.includes('s3.ap-south-2.amazonaws.com') ||
      request.url.includes('amazonaws.com');

    // Do NOT attach token for the token refresh endpoint itself.
    // This prevents an infinite loop where the refresh call also gets intercepted.
    const isRefreshUrl = request.url.includes('/api/token/refresh/');

    if (token && !isS3Url && !isRefreshUrl) {
      request = this.attachToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        // Only handle 401 Unauthorized errors.
        // Other errors (400, 403, 404, 500) should pass through normally.
        if (error.status === 401 && !isRefreshUrl) {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  // Clones the request and adds the Authorization Bearer token header.
  private attachToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Handles a 401 error by attempting to refresh the access token.
  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // If a refresh is already in progress, wait for it to complete,
    // then retry the original failed request with the new token.
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),  // Wait until a new token is available
        take(1),                           // Take only the first emission
        switchMap(newToken => {
          return next.handle(this.attachToken(request, newToken!));
        })
      );
    }

    // No refresh in progress — start one now.
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null); // Signal to waiting requests that refresh is in progress

    const refreshToken = localStorage.getItem('refresh_token');

    // If there is no refresh token stored, we cannot refresh — log the user out.
    if (!refreshToken) {
      this.isRefreshing = false;
      this.performLogout();
      return throwError(() => new Error('No refresh token available.'));
    }

    // Call the backend to get a new access token using the refresh token.
    // auth_interceptor.ts line ~80
    return this.http.post<{ access: string }>(`${environment.apiBaseUrl}/api/token/refresh/`, {
      refresh: refreshToken
    }).pipe(
      switchMap((tokenResponse: { access: string }) => {
        this.isRefreshing = false;

        // Save the new access token to localStorage.
        const newAccessToken = tokenResponse.access;
        localStorage.setItem('access_token', newAccessToken);

        // Notify all waiting requests that the new token is ready.
        this.refreshTokenSubject.next(newAccessToken);

        // Retry the original request that triggered the 401 with the new token.
        return next.handle(this.attachToken(request, newAccessToken));
      }),
      catchError((refreshError) => {
        // The refresh token itself is invalid or expired.
        // The user's session is completely expired — they must log in again.
        this.isRefreshing = false;

        // IMPORTANT: Do NOT log the user out if they are currently in the middle of an exam.
        // Losing exam progress would be a very bad experience.
        // The exam component has its own error handling for this situation.
        const currentUrl = this.router.url;
        const isOnExamPage = currentUrl.includes('student-dashboard') || currentUrl.includes('exam');

        if (isOnExamPage) {
          // Do not redirect. Just let the request fail silently.
          // The exam component will handle this gracefully.
          console.warn('AuthInterceptor: Session expired during exam. Not redirecting to protect exam progress.');
          return throwError(() => refreshError);
        }

        // Not on an exam page — safe to log out and redirect.
        this.performLogout();
        return throwError(() => refreshError);
      })
    );
  }

  // Clears all stored auth data and navigates to the login page.
  private performLogout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('STUDENT_DATA');
    this.router.navigate(['/login']);
  }
}