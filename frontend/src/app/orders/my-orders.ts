import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from './orders.service';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-my-orders',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './my-orders.html',
    styleUrls: ['./my-orders.css']
})
export class MyOrders implements OnInit {
    orders: any[] = [];

    constructor(
        private ordersService: OrdersService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        const userId = this.authService.getUserId();
        if (userId) {
            this.ordersService.getUserOrders(userId).subscribe({
                next: (response) => {
                    console.log('Fetched orders:', response.data);
                    this.orders = response.data ?? [];
                },
                error: (err) => {
                    const fieldErrors = err.error?.feildErrors ?? [];
                    if (fieldErrors.length) {
                        console.error('Field errors:', fieldErrors);
                    } else {
                        console.error('Failed to fetch orders:', err);
                    }
                },
            });
        }
    }
}
