import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductsService } from './products.service';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../shared/auth.service';  // Import AuthService

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  products: Product[] = [];
  loading = true;
  userId: number | null;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private authService: AuthService   // Inject AuthService
  ) {
    this.userId = this.authService.getUserId();   // Get userId from AuthService
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      }
    });
  }

  addToCart(productId: number) {
    if (this.userId == null) {
      alert('Please login to add items to your cart.');
      return;
    }
    this.cartService.addToCart(this.userId, productId, 1).subscribe({
      next: item => {
        alert('Item added to cart!');
        // Optionally refresh cart view or cart badge here
      },
      error: err => {
        alert('Cannot add to cart: ' + (err.error?.message || err.message));
      }
    });
  }
}
