import { Component, inject, Signal } from '@angular/core';
import { Product } from '../product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductsService } from '../products.service';
import { CartService } from './../../cart/cart.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    standalone: true,
    imports: [ProductItemComponent, NgFor]
})
export class ProductsListComponent {

  products: Signal<Product[]>;

  cartService = inject(CartService)
  productsService = inject(ProductsService)

  constructor() {
    this.products = this.productsService.load();
  }

  addProductToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}
