import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { LocalStorageService } from '../Services/local-storage.service';
import {Cart} from "../Models/cart.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {

  cart: Cart;

  constructor(private cartService: CartService, private localStorageService: LocalStorageService) {
    this.cart = new Cart('0');
  }

  ngOnInit() {
    this.cartService.currentCartMessage.subscribe( (message: boolean) => {
      if (message) { this.getCartInfo() }
    });
  }

  getCartInfo(){
    const cartId = this.localStorageService.get('cartId');

    if (cartId) {
      this.cartService.getInfoCart(cartId).subscribe( (cart: Cart) => {
        this.cart.totalItems = cart.totalItems;
      });
    } else {
      this.cartService.createCart().subscribe( data => {
        this.localStorageService.set('cartId', data.guid);
        this.cartService.getInfoCart(cartId).subscribe( (cart: Cart) => {
          this.cart.totalItems = cart.totalItems;
        });
      });
    }
  }
}
