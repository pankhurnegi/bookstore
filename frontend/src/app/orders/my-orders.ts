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

    getTotalPrice(order: any): number {
        if (!order?.orderItems) return 0;
        return order.orderItems.reduce((sum: number, item: any) => {
            const price = Number(item.price) || Number(item.product?.price) || 0;
            return sum + price * item.quantity;
        }, 0);
    }

    ngOnInit() {
        const userId = this.authService.getUserId();
        if (userId) {
            this.ordersService.getUserOrders(userId).subscribe({
                next: (response) => {
                    // Log the raw response for debugging
                    console.log('Fetched orders:', response);
                    // Try to map the response to ensure price is available
                    const orders = response.data ?? response ?? [];
                    this.orders = orders.map((order: any) => ({
                        ...order,
                        orderItems: order.orderItems?.map((item: any) => ({
                            ...item,
                            price: item.price ?? item.product?.price ?? 0
                        })) ?? []
                    }));
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
    cancelOrder(orderId: number) {
        if (confirm('Are you sure you want to cancel this order?')) {
            this.ordersService.cancelOrder(orderId).subscribe({
                next: () => {
                    this.orders = this.orders.filter(order => order.id !== orderId);
                },
                error: (err) => {
                    alert('Failed to cancel order: ' + (err.error?.message || err.message));
                }
            });
        }
    }
}
