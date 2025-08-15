import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onSubmit() {
    this.error = null;

    if (this.loginForm.invalid) {
      this.error = 'Please enter both email and password.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        // Save the token for future use (e.g., in localStorage)
        localStorage.setItem('access_token', res.access_token);
        alert('Login successful!');

        // Redirect or update UI accordingly
      },
      error: (err) => {
        if (err.error?.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Login failed. Please check your credentials.';
        }
      },
    });
  }
}

