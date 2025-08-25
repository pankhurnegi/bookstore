import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CartService } from '../cart/cart.service';



@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.css']
})
export class NavbarComponent {

    cartCount = 0;
    showCartCount = true;

    constructor(public authService: AuthService,
        private cartService: CartService,
        private router: Router
    ) { }

    ngOnInit() {
        this.cartService.cartCount$.subscribe(count => {
            this.cartCount = count;
        });
        this.updateShowCartCount();
        this.router.events.subscribe(() => {
            this.updateShowCartCount();
        });
    }

    updateShowCartCount() {
        // Show cart count on all pages, including delivery-payment
        this.showCartCount = true;
    }



    get isLoggedIn(): boolean {
        return this.authService.getUserId() !== null;
    }

    logout() {
        this.authService.logout();
    }

    goToProducts() {
        this.router.navigate(['/products']);
    }

}
