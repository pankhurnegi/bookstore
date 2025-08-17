// src/app/login/login.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter both email and password.', 'Error');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access_token);
        this.toastr.success('Login successful!', 'Success');
        this.loginForm.reset();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        const message = err.error?.message || 'Login failed. Please check your credentials.';
        this.toastr.error(message, 'Error');
      },
    });
  }
}
