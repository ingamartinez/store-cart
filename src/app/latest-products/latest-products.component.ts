import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProductServices } from '../Services/product.service';
import { Product } from '../Models/product.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Constants } from '../app.const';
import { CartService } from '../Services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css'],
  providers: [ProductServices]
})
export class LatestProductsComponent implements OnInit {

  products: Product[];
  image = './assets/img/product/1.jpg';
  baseURL: string;

  customOptions: OwlOptions = {
    loop: true,
    nav: true,
    dots: false,
    margin: 30,
    autoplay: true,
    autoWidth: true,
    navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
    responsive: {
      0: {
        items: 4,
      },
      480: {
        items: 4,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 4,
      }
    }
  };

  constructor(private productService: ProductServices, private cartService: CartService, private toastr: ToastrService) {
    this.baseURL = Constants.baseURL;
    productService.getProducts().subscribe((data: any) => {
      this.products = data.products;
    });
  }

  ngOnInit() {
  }

  addToCart(product: Product) {
    const values = { product: { code: product.code, qty: 1 } };
    this.cartService.insertToCart(values).subscribe((data: any) => {
      this.cartService.changeCartMessage(true);
      this.toastr.success('Cart', 'Product Added Successfully');
    });
  }

}
