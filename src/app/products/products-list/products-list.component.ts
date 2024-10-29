import { CartService } from './../../cart/cart.service';
import { Component, Signal } from '@angular/core';
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

  constructor(private service: ProductsService, private cartService: CartService) {
    this.products = this.service.load();
  }

  addProductToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}
