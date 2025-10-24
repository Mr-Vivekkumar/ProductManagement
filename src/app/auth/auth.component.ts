import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isLoginMode = true; // Start with login mode
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService); // Inject ApiService
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get email() {
    return this.isLoginMode
      ? this.loginForm.get('email')
      : this.registerForm.get('email');
  }

  get password() {
    return this.isLoginMode
      ? this.loginForm.get('password')
      : this.registerForm.get('password');
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    const userData = this.loginForm.value;
    this.apiService.loginUser(userData).subscribe({
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', JSON.stringify(response.token));
        console.log(JSON.stringify(response.token));
        this.toastr.success('Logged in successfully!', 'Success');
        this.router.navigate(['/home']); // Redirect to the dashboard after successful login
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Login failed!', 'Error');
      },
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    const userData = this.registerForm.value;
    this.apiService.registerUser(userData).subscribe({
      next: (response: any) => {
        alert('User registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        alert('Registration failed');
      },
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
