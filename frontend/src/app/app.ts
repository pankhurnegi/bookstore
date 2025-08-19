// src/app/app.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { NavbarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Angular Auth App';
  constructor(public authService: AuthService) { }
}
