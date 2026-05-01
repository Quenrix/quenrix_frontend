import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  forgotEmail: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  hidePassword: boolean = true;
  isForgotPasswordMode: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleView() {
    this.isForgotPasswordMode = !this.isForgotPasswordMode;
    this.errorMessage = '';
    this.successMessage = '';
    this.forgotEmail = '';
    this.password = '';
    this.username = '';
  }

  login() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;
    
    // Test Mode: Allow bypass with email ending in @test.com
    if (this.username.endsWith('@test.com')) {
      setTimeout(() => {
        this.isLoading = false;
        const testRole = this.username.includes('admin') ? 'admin' : 
                        this.username.includes('trainer') ? 'trainer' : 'student';
        
        localStorage.setItem('access_token', 'test_token_' + Date.now());
        localStorage.setItem('refresh_token', 'test_refresh_' + Date.now());
        localStorage.setItem('userRole', testRole);
        localStorage.setItem('userId', '12345');
        
        this.navigationService.setCurrentUser(testRole, '12345');
        this.successMessage = `Test login successful as ${testRole}!`;
        
        setTimeout(() => {
          if (testRole === 'admin') {
            this.router.navigate(['/admin']);
          } else if (testRole === 'trainer') {
            this.router.navigate(['/trainer']);
          } else {
            this.router.navigate(['/student']);
          }
        }, 500);
      }, 1000);
      return;
    }
    
    this.api.login(this.username, this.password).subscribe(
      (res: any) => { 
        this.isLoading = false;
        if (res.access) localStorage.setItem('access_token', res.access);
        if (res.refresh) localStorage.setItem('refresh_token', res.refresh);

        const role = res.role ? res.role.toLowerCase() : null;
        const userId = res.userId || res.user_id || null;

        if (!role) {
          this.errorMessage = 'Login failed. Role information missing.';
          return; 
        }

        // Set user in navigation service for dynamic menus
        this.navigationService.setCurrentUser(role, userId);

        console.log('Login successful:', role);

        // Redirect based on role using new lazy-loaded routes
        if (role === 'admin') { 
          this.router.navigate(['/admin']);
        } else if (role === 'trainer' || role === 'itrainer') { 
          this.router.navigate(['/trainer']);
        } else if (role === 'student') { 
          this.router.navigate(['/student']);
        } else {
          this.errorMessage = `Role '\${res.role}' is unrecognized.`;
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'Login failed. Invalid credentials.';
      } 
    );
  }

  requestForgotPassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.forgotEmail) {
      this.errorMessage = 'Please enter your registered email address.';
      return;
    }
    
    if (!this.forgotEmail.includes('@') || !this.forgotEmail.includes('.')) {
        this.errorMessage = 'Please enter a valid email address.';
        return;
    }

    this.isLoading = true;
  }

  goBack() {
    this.router.navigate(['/landing-page']); 
  }
}