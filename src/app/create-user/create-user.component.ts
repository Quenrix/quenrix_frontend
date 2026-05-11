import { Component, OnInit, Input, inject } from '@angular/core';
import { UserService } from '../services/user.service'; 
import { AlertService } from '../services/alert.service'; // Import AlertService
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Input() isModalMode: boolean = false;
  @Input() modalData: any;
  @Input() closeModal!: () => void;

  username: string = '';
  password?: string = '';
  roleid: number = 1;
  profileImage: string | ArrayBuffer | null = null; 

  roles = [
    { id: 4, name: 'Admin' },
    { id: 5, name: 'Trainer' },
    { id: 6, name: 'Student' }
  ];

  onProfileImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Flags for loading state and password visibility
  isLoading: boolean = false;
  showPassword: boolean = false;

  private userService = inject(UserService);
  private alertService = inject(AlertService);
  private modalService = inject(ModalService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  createUser(): void {
    // Prevent multiple clicks
    if (this.isLoading) {
      return;
    }

    if (!this.username || !this.password || !this.roleid) {
      this.alertService.warning('Please enter all required fields (Email, Password, and Role).', 'Validation Error');
      return;
    }

    // ✅ NEW: Strict Gmail Validation Regex
    // 1. Checks for standard email characters before @
    // 2. Strictly requires @gmail.com at the end
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(this.username)) {
      this.alertService.warning('Invalid Email! Please enter a valid Gmail address (e.g. user@gmail.com).', 'Validation Error');
      return;
    }

    // ✅ OPTIONAL: Check if the part before @ is just numbers (agar aapko '12345@gmail.com' block karna hai)
    const localPart = this.username.split('@')[0];
    if (/^\d+$/.test(localPart)) {
        this.alertService.warning('Username cannot consist only of numbers before @gmail.com.', 'Validation Error');
        return;
    }

    const payload = {
        username: this.username,
        password: this.password,
        roleid: this.roleid,
        profileImage: this.profileImage
    };

    // Start loading state
    this.isLoading = true;

    this.userService.registerUser(payload).subscribe({
      next: (response) => {
        // Stop loading state
        this.isLoading = false;

        const roleName = this.roles.find(r => r.id === this.roleid)?.name;
        
        // Show Success Alert
        this.alertService.success(
            `User "${this.username}" successfully created and assigned role: ${roleName}`, 
            'User Created'
        );

        this.username = '';
        this.password = ''; 
        this.roleid = 1;
        this.profileImage = null;

        // Close modal if in modal mode
        if (this.isModalMode) {
          setTimeout(() => this.closeModal?.(), 1500);
        }
      },
      error: (err) => {
        // Stop loading state
        this.isLoading = false;

        let errorMessage = 'An unknown error occurred during registration.';
        let errorTitle = 'Registration Failed';
        
        // Handle specific error cases
        if (err.status === 409 || (err.error && typeof err.error.detail === 'string' && err.error.detail.toLowerCase().includes('exists'))) {
            errorMessage = 'User is already registered!';
            errorTitle = 'User Exists';
        } 
        else if (err.error && (
            (err.error.password && err.error.password.includes('incorrect')) || 
            (err.error.detail && err.error.detail.toLowerCase().includes('password'))
        )) {
            errorMessage = 'Password is incorrect';
        }
        else if (err.status === 400 && err.error) {
            // Display specific validation errors from backend
            errorMessage = err.error.username?.[0] || err.error.password?.[0] || err.error.roleid?.[0] || err.error.detail || `Invalid data sent.`;
        }
        
        // Show Error Alert
        this.alertService.error(errorMessage, errorTitle);
        console.error('Registration Error:', err);
      }
    });
  }

  goBack(): void {
    if (this.isModalMode) {
      this.closeModal?.();
    } else {
      this.router.navigate(['/admin-panel']);
    }
  }
}