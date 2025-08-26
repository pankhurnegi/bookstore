import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
    private apiUrl = 'http://localhost:3000/cart';

    constructor(private http: HttpClient) { }

    private cartCountSubject = new BehaviorSubject<number>(0);

    cartCount$ = this.cartCountSubject.asObservable();



    getUserCart(userId: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
        return this.http.get(`${this.apiUrl}?userId=${userId}`, { headers });
    }

    addToCart(userId: number, productId: number, quantity: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
        return this.http.post(this.apiUrl, { userId, productId, quantity }, { headers }).pipe(

            switchMap(() => this.getUserCart(userId)),
            tap((response: any) => {
                this.cartCountSubject.next((response.data ?? []).length);
            })
        );
    }

    updateQuantity(id: number, quantity: number, userId?: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
        return this.http.patch(`${this.apiUrl}/${id}`, { quantity }, { headers }).pipe(
            switchMap(() => userId ? this.getUserCart(userId) : []),
            tap((response: any) => {
                if (userId) this.cartCountSubject.next((response.data ?? []).length);
            })
        );
    }

    removeFromCart(id: number, userId?: number): Observable<any> {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
        return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
            switchMap(() => userId ? this.getUserCart(userId) : []),
            tap((response: any) => {
                if (userId) this.cartCountSubject.next((response.data ?? []).length);
            })
        );
    }
    resetCartCount() {
        this.cartCountSubject.next(0);
    }
}
