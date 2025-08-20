import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

interface ProfileFormType {
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string | null>;
}

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './profile.html',
    styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
    profileForm: FormGroup<ProfileFormType>;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.profileForm = this.fb.group({
            username: new FormControl('', { nonNullable: true, validators: Validators.required }),
            email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
            password: new FormControl<string | null>(null),
        });
    }

    ngOnInit() {
        const userId = this.authService.getUserId();
        if (!userId) {
            this.router.navigate(['/login']);
            return;
        }
        this.authService.getUserProfile(userId).subscribe({
            next: user => {
                this.profileForm.patchValue({
                    username: user.username,
                    email: user.email,
                    // password omitted to avoid null assignment error
                });
            },
            error: err => {
                const fieldErrors = err.error?.feildErrors ?? [];
                if (fieldErrors.length) {
                    alert('Error loading profile: ' + JSON.stringify(fieldErrors));
                } else {
                    alert('Error loading profile: ' + (err.error?.message || err.message));
                }
            }
        });
    }

    submit() {
        if (this.profileForm.valid) {
            const updateData = this.profileForm.value;

            // Remove password field if empty to avoid overwriting with null
            if (!updateData.password) {
                delete updateData.password;
            }

            this.authService.updateUserProfile(updateData).subscribe({
                next: () => alert('Profile updated successfully!'),
                error: err => {
                    const fieldErrors = err.error?.feildErrors ?? [];
                    if (fieldErrors.length) {
                        alert('Update failed: ' + JSON.stringify(fieldErrors));
                    } else {
                        alert('Update failed: ' + (err.error?.message || err.message));
                    }
                },
            });
        }
    }



}
