import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    updateUserProfile(userId: number, profileData: any, token: string) {
        return this.http.put(`${this.apiUrl}/profile/${userId}`, profileData, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
}
