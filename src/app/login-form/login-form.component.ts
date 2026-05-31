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
    
    // Mocking the response because the backend server is not responding.
    // This allows you to proceed to the dashboard.
    setTimeout(() => {
      this.isLoading = false;
      const authenticatedRole = 'TRAINER';
      
      localStorage.setItem('access_token', 'mock_access_token');
      localStorage.setItem('refresh_token', 'mock_refresh_token');
      localStorage.setItem('user_role', authenticatedRole);
      
      console.log('Mock Login successful:', authenticatedRole);
      
      this.router.navigate(['/trainer-dashboard']);
    }, 1000);
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