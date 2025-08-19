import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface User {
    id: number;
    username: string;
    email: string;
}

interface LoginResponse {
    access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';
    private _user: User | null = null;

    constructor(private http: HttpClient) { }

    register(data: RegisterRequest): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, data);
    }

    login(data: LoginRequest): Observable<User> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
            tap(response => {
                localStorage.setItem('access_token', response.access_token);
            }),
            switchMap(() => this.fetchUserProfile())
        );
    }

    fetchUserProfile(): Observable<User> {
        const token = localStorage.getItem('access_token');
        return this.http.get<User>(`${this.apiUrl}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        }).pipe(
            tap(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this._user = user;
            })
        );
    }

    getUser(): User | null {
        if (!this._user) {
            const userJson = localStorage.getItem('user');
            try {
                this._user = userJson ? JSON.parse(userJson) : null;
            } catch {
                localStorage.removeItem('user');
                this._user = null;
            }
        }
        return this._user;
    }

    getUserId(): number | null {
        const user = this.getUser();
        return user ? user.id : null;
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this._user = null;
    }

    // update profile

    getUserProfile(userId: number) {
        return this.http.get<User>(`${this.apiUrl}/users/${userId}`); // adapt to your backend API
    }

    updateUserProfile(profileData: any) {
        return this.http.put(`${this.apiUrl}/users/profile`, profileData);
    }

}
