import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from './orders.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-delivery-payment',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './delivery-payment.html',
    styleUrls: ['./delivery-payment.css']
})
export class DeliveryPayment {
    orderForm: FormGroup;
    paymentMethods = ['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'];
    message = 'Please fill delivery and payment details to place your order.';

    constructor(
        private fb: FormBuilder,
        private ordersService: OrdersService,
        private router: Router,
        private authService: AuthService
    ) {
        this.orderForm = this.fb.group({
            addressLine1: ['', Validators.required],
            addressLine2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            pinCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
            paymentMethod: ['', Validators.required],
        });
    }

    submitOrder() {
        if (this.orderForm.valid) {
            const userId = this.authService.getUserId();
            if (!userId) {
                alert('Please login to place orders.');
                this.router.navigate(['/login']);
                return;
            }
            const orderData = { userId, ...this.orderForm.value };
            this.ordersService.createOrder(orderData).subscribe({
                next: () => {
                    alert('Order placed successfully!');
                    this.router.navigate(['/products']);
                },
                error: (err) => alert('Failed to place order: ' + err.message),
            });
        } else {
            alert('Please fill all required fields correctly.');
        }
    }
}
