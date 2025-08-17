import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
    id: number;
    name: string;
    description: string;
    authors: string;
    price: number;
    available: boolean;
    category: string;
    imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private apiUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }
}
