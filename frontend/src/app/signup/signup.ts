import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
})
export class SignupComponent {
  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,20}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onSubmit() {
    this.message = null;
    this.error = null;

    if (this.signupForm.invalid) {
      this.error = 'Please fill all fields correctly.';
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: (response) => {
        this.message = 'Registration successful! You can now login.';
        this.signupForm.reset();
      },
      error: (err) => {
        if (err.error?.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      },
    });
  }
}
