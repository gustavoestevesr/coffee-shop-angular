import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CartItem } from '../cart-item';
import { CartService } from '../cart.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: ['./cart-list.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, CartItemComponent, AsyncPipe]
})
export class CartListComponent implements OnInit {

  cartItems!: Signal<CartItem[]>;
  cartTotal = 0;

  cartService = inject(CartService)

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
}
