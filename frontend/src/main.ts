import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { Signup } from './app/auth/signup/signup';
import { Login } from './app/auth/login/login';
import { Products } from './app/products/products';
import { Cart } from './app/cart/cart';
import { DeliveryPayment } from './app/orders/delivery-payment';
import { MyOrders } from './app/orders/my-orders';
import { Profile } from './app/profile/profile';
bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            HttpClientModule,
            BrowserAnimationsModule,
            ToastrModule.forRoot()
        ),
        provideRouter([
            { path: 'signup', component: Signup },
            { path: 'login', component: Login },
            { path: 'products', component: Products },
            { path: 'cart', component: Cart },
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'delivery-payment', component: DeliveryPayment },
            { path: 'my-orders', component: MyOrders },
            { path: 'profile', component: Profile }


        ])
    ],
});
