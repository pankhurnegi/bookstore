import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductsService } from './products.service';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../shared/auth.service';
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
      next: response => {
        this.products = response.data ?? [];
        this.currentPage = 1;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        const fieldErrors = err.error?.feildErrors ?? [];
        if (fieldErrors.length) {
          alert('Field errors: ' + JSON.stringify(fieldErrors));
        }
      }
    });
  }

  addToCart(productId: number) {
    if (this.userId == null) {
      alert('Please login to add items to your cart.');
      return;
    }
    this.cartService.addToCart(this.userId, productId, 1).subscribe({
      next: response => {
        alert('Item added to cart!');
      },
      error: err => {
        const fieldErrors = err.error?.feildErrors ?? [];
        if (fieldErrors.length) {
          alert('Cannot add to cart: ' + JSON.stringify(fieldErrors));
        } else {
          alert('Cannot add to cart: ' + (err.error?.message || err.message));
        }
      }
    });
  }

  // Number of books per page (2 rows x 4 columns = 8)
  booksPerPage = 8;
  currentPage = 1;

  // Compute total pages
  get totalPages(): number {
    return Math.ceil(this.products.length / this.booksPerPage);
  }

  // Get products for current page
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.booksPerPage;
    return this.products.slice(startIndex, startIndex + this.booksPerPage);
  }

  // Navigate pages
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToNext() {
    this.goToPage(this.currentPage + 1);
  }

  goToPrevious() {
    this.goToPage(this.currentPage - 1);
  }
}
