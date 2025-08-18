import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from './cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']   
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;
  error: string | null = null;
  userId: number | null;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    // Fetch userId from AuthService, do NOT hardcode or use localStorage directly here
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    // Only load cart if user is logged in (userId not null)
    if (this.userId != null) {
      this.loadCart();
    } else {
      this.error = 'Please log in to view your cart.';
    }
  }

  loadCart() {
    this.loading = true;
    if (this.userId == null) {
      this.error = 'User not logged in';
      this.loading = false;
      return;
    }
    this.cartService.getCart(this.userId).subscribe({
      next: items => {
        this.cartItems = items;
        this.loading = false;
        this.error = null;
      },
      error: err => {
        this.error = err.error?.message || 'Failed to load cart';
        this.loading = false;
      }
    });
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 1 || newQuantity > 5) return;
    this.loading = true;
    this.cartService.updateQuantity(item.id, newQuantity).subscribe({
      next: updatedItem => {
        item.quantity = updatedItem.quantity;
        this.loading = false;
        this.error = null;
      },
      error: err => {
        this.error = err.error?.message || 'Cannot update quantity';
        this.loading = false;
      }
    });
  }

  remove(item: CartItem) {
    this.loading = true;
    this.cartService.removeFromCart(item.id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.id !== item.id);
        this.loading = false;
        this.error = null;
      },
      error: err => {
        this.error = err.error?.message || 'Cannot remove item';
        this.loading = false;
      }
    });
  }
}
