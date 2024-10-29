import { Component, inject, Input } from '@angular/core';
import { CartItem } from '../cart-item';
import { CartService } from '../cart.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { CurrencyPipe } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
    standalone: true,
    imports: [MatFormField, MatLabel, MatSelect, MatOption, MatMiniFabButton, MatIcon, CurrencyPipe]
})
export class CartItemComponent {

  @Input() cartItem!: CartItem;

  quantityOptions = [1, 2, 3, 4, 5];

  cartService = inject(CartService)
  toastr = inject(ToastrService)

  onQuantityChange(quantity: number, cartItem: CartItem) {
    cartItem.quantity = quantity;
    this.cartService.updateCartQuantity(cartItem);
  }

  onRemove(): void {
    this.toastr.success(`Product removed from the cart.`, 'Success', {
      progressBar: true,
    })
    this.cartService.removeProduct(this.cartItem.product);
  }
}
