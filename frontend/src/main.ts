import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            HttpClientModule,
            BrowserAnimationsModule,
            ToastrModule.forRoot()
        ),
        provideRouter([
            { path: 'signup', loadComponent: () => import('./app/auth/signup/signup').then(m => m.Signup) },
            { path: 'login', loadComponent: () => import('./app/auth/login/login').then(m => m.Login) },
            { path: 'products', loadComponent: () => import('./app/products/products').then(m => m.Products) },
            { path: 'cart', loadComponent: () => import('./app/cart/cart').then(m => m.Cart) },
            { path: '', redirectTo: '/products', pathMatch: 'full' },
            { path: 'delivery-payment', loadComponent: () => import('./app/orders/delivery-payment').then(m => m.DeliveryPayment) },
            { path: 'my-orders', loadComponent: () => import('./app/orders/my-orders').then(m => m.MyOrders) },
            { path: 'profile', loadComponent: () => import('./app/profile/profile').then(m => m.Profile) },
            { path: '**', loadComponent: () => import('./app/not-found/not-found').then(m => m.NotFoundComponent) }
        ]),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
});
