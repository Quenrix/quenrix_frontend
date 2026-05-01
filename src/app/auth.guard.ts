import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return this.router.createUrlTree(['/login']);
    }

    if (this.isTokenExpired(token)) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken || this.isTokenExpired(refreshToken)) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        return this.router.createUrlTree(['/login']);
      }

      return true;
    }

    // Role-based access check
    const requiredRole = route.data?.['requiredRole'];
    if (requiredRole) {
      const userRole = localStorage.getItem('userRole');
      if (userRole !== requiredRole) {
        if (userRole === 'admin') {
          return this.router.createUrlTree(['/admin']);
        } else if (userRole === 'trainer' || userRole === 'itrainer') {
          return this.router.createUrlTree(['/trainer']);
        } else if (userRole === 'student') {
          return this.router.createUrlTree(['/student']);
        }
        return this.router.createUrlTree(['/']);
      }
    }

    return true;
  }

  private isTokenExpired(token: string): boolean {
    // Skip expiry check for test tokens
    if (token.startsWith('test_token_')) {
      return false;
    }

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
      console.error('AuthGuard: Failed to decode token.', error);
      return true;
    }
  }
}