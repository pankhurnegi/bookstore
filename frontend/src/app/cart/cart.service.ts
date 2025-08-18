import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product?: {
        name: string;
        price: number;
        imageUrl?: string;
        stockQuantity?: number;
        // ...other product fields
    };
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private apiUrl = 'http://localhost:3000/cart';

    constructor(private http: HttpClient) { }

    getCart(userId: number): Observable<CartItem[]> {
        return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
    }

    addToCart(userId: number, productId: number, quantity: number): Observable<CartItem> {
        return this.http.post<CartItem>(this.apiUrl, { userId, productId, quantity });
    }

    updateQuantity(id: number, quantity: number): Observable<CartItem> {
        return this.http.patch<CartItem>(`${this.apiUrl}/${id}`, { quantity });
    }

    removeFromCart(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
