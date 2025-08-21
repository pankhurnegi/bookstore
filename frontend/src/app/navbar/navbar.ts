import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.css']
})
export class NavbarComponent {
    constructor(public authService: AuthService) { }

    get isLoggedIn(): boolean {
        return this.authService.getUserId() !== null;
    }

    logout() {
        this.authService.logout();
    }

}
