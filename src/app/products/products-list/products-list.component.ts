import { CartService } from './../../cart/cart.service';
import { Component, inject, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { AsyncPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    standalone: true,
    imports: [ProductItemComponent, MatCard, MatCardContent, MatIconButton, MatIcon, AsyncPipe]
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
