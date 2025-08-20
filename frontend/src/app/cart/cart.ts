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
  quantityInputs: { [cartItemId: number]: number } = {};

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
      next: response => {
        this.cartItems = response.data ?? [];
        console.log('Loaded cart items:', this.cartItems);
        // Sync quantityInputs with cartItems
        this.quantityInputs = {};
        for (const item of this.cartItems) {
          this.quantityInputs[item.id] = item.quantity;
        }
      },
      error: err => {
        const fieldErrors = err.error?.feildErrors ?? [];
        if (fieldErrors.length) {
          alert('Error loading cart: ' + JSON.stringify(fieldErrors));
        } else {
          alert(err.error?.message || 'Error loading cart!');
        }
      }
    });
  }

  addToCart(productId: number, quantity: number) {
    this.cartService.addToCart(this.userId!, productId, quantity).subscribe({
      next: response => { this.loadCart(); },
      error: err => {
        const fieldErrors = err.error?.feildErrors ?? [];
        if (fieldErrors.length) {
          alert('Cannot add to cart: ' + JSON.stringify(fieldErrors));
        } else {
          alert(err.error?.message || 'Cannot add to cart!');
        }
      }
    });
  }

  updateQuantity(cartItemId: number, quantity: number) {
    // Find the cart item to get max stock
    const item = this.cartItems.find(i => i.id === cartItemId);
    if (!item) return;
    const maxQty = Math.min(5, item.product?.stockQuantity ?? 5);
    // Clamp quantity
    const clampedQty = Math.max(1, Math.min(quantity, maxQty));
    this.quantityInputs[cartItemId] = clampedQty;
    this.cartService.updateQuantity(cartItemId, clampedQty).subscribe({
      next: response => {
        console.log('Update quantity response:', response);
        this.loadCart();
      },
      error: err => {
        console.error('Update quantity error:', err);
        const fieldErrors = err.error?.feildErrors ?? [];
        if (fieldErrors.length) {
          alert('Cannot update cart item: ' + JSON.stringify(fieldErrors));
        } else {
          alert(err.error?.message || 'Cannot update cart item!');
        }
      }
    });
  }

  removeFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId).subscribe({
      next: response => { this.loadCart(); },
      error: err => {
        const fieldErrors = err.error?.feildErrors ?? [];
        if (fieldErrors.length) {
          alert('Cannot remove cart item: ' + JSON.stringify(fieldErrors));
        } else {
          alert(err.error?.message || 'Cannot remove cart item!');
        }
      }
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
