import { CartService } from './../../cart/cart.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    standalone: true,
    imports: [NgFor, MatCard, NgIf, MatCardContent, MatIconButton, MatIcon, AsyncPipe]
})
export class ProductsListComponent {

  products$: Observable<Product[]>;

  constructor(private service: ProductsService, private cartService: CartService) {
    this.products$ = this.service.load();
  }

  addProductToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}
