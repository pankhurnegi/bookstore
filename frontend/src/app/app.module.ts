import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';

@NgModule({
    declarations: [App],
    imports: [
        BrowserModule,
        ReactiveFormsModule,   // For reactive forms
        HttpClientModule,      // For HTTP requests
    ],
    providers: [],
    bootstrap: [App],
})
export class AppModule { }
