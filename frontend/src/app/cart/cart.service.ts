import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
    private apiUrl = 'http://localhost:3000/cart';

    constructor(private http: HttpClient) { }

    getUserCart(userId: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
        return this.http.get(`${this.apiUrl}?userId=${userId}`, { headers });
    }

    addToCart(userId: number, productId: number, quantity: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
        return this.http.post(this.apiUrl, { userId, productId, quantity }, { headers });
    }

    updateQuantity(id: number, quantity: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
        return this.http.patch(`${this.apiUrl}/${id}`, { quantity }, { headers });
    }

    removeFromCart(id: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
        return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }
}
