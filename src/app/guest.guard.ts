import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavigationService } from './services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router, private navigationService: NavigationService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    const role = this.navigationService.getCurrentRole();

    if (!token) {
      return true;
    }

    if (this.isTokenExpired(token)) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken || this.isTokenExpired(refreshToken)) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.navigationService.clearUser();
        return true;
      }
    }

    if (role) {
      this.redirectByRole(role);
      return false;
    }

    const roleFromToken = this.getRoleFromToken(token);
    if (roleFromToken) {
      this.navigationService.setCurrentUser(roleFromToken, localStorage.getItem('userId'));
      this.redirectByRole(roleFromToken);
      return false;
    }

    return true;
  }

  private redirectByRole(role: string): void {
    switch (role.toUpperCase()) {
      case 'STUDENT':
        this.router.navigate(['/student/student-dashboard']);
        break;
      case 'TRAINER':
      case 'ITRAINER':
        this.router.navigate(['/trainer/trainer-dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/admin-panel']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  private getRoleFromToken(token: string): string | null {
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return null;

      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));
      return decodedPayload.role || null;
    } catch (error) {
      console.error('GuestGuard: Failed to decode token.', error);
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return true;

      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));

      if (!decodedPayload.exp) return false;

      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const bufferSeconds = 30;

      return decodedPayload.exp < (currentTimeInSeconds + bufferSeconds);
    } catch (error) {
      console.error('GuestGuard: Failed to decode token.', error);
      return true;
    }
  }
}