import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from './cart.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  userId: number | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    if (this.userId !== null) {
      this.loadCart();
    } else {
      alert('Please log in to view your cart.');
    }
  }

  loadCart() {
    this.cartService.getUserCart(this.userId!).subscribe({
      next: items => { this.cartItems = items; },
      error: err => { alert(err.error?.message || 'Error loading cart!'); }
    });
  }

  addToCart(productId: number, quantity: number) {
    this.cartService.addToCart(this.userId!, productId, quantity).subscribe({
      next: item => { this.loadCart(); },
      error: err => { alert(err.error?.message || 'Cannot add to cart!'); }
    });
  }

  updateQuantity(cartItemId: number, quantity: number) {

    this.cartService.updateQuantity(cartItemId, quantity).subscribe({
      next: item => { this.loadCart(); },
      error: err => { alert(err.error?.message || 'Cannot update cart item!'); }
    });
  }

  removeFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId).subscribe({
      next: () => { this.loadCart(); },
      error: err => { alert(err.error?.message || 'Cannot remove cart item!'); }
    });
  }

  get cartTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.quantity * (item.product?.price || 0)),
      0
    );
  }

  onPlaceOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty. Add items before placing an order.');
      return;
    }
    this.router.navigate(['/delivery-payment']);
  }


}
