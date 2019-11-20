import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LatestProductsComponent } from './latest-products/latest-products.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselHolderComponent } from './carousel-holder/carousel-holder.component';
import { LocalStorageService } from './Services/local-storage.service';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header/header.component';
import {CartService} from "./Services/cart.service";
import {HomeComponent} from "./home/home-component";
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    LatestProductsComponent,
    CarouselHolderComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot()
  ],
  providers: [LocalStorageService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
