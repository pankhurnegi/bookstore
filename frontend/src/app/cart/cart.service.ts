import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
    private apiUrl = 'http://localhost:3000/cart';

    constructor(private http: HttpClient) { }

    getUserCart(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}?userId=${userId}`);
    }

    addToCart(userId: number, productId: number, quantity: number): Observable<any> {
        return this.http.post(this.apiUrl, { userId, productId, quantity });
    }

    updateQuantity(id: number, quantity: number): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, { quantity });
    }

    removeFromCart(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
