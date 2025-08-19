import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from './orders.service';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-my-orders',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './my-orders.html',
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
                next: (orders) => {
                    console.log('Fetched orders:', orders);
                    this.orders = orders;
                },
                error: (err) => {
                    console.error('Failed to fetch orders:', err);
                },
            });
        }
    }
}
