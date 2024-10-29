import { Component, inject } from '@angular/core';

import { CartService } from '../cart.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cart-total-summary',
    templateUrl: './cart-total-summary.component.html',
    styleUrls: ['./cart-total-summary.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatButton, AsyncPipe, CurrencyPipe]
})
export class CartTotalSummaryComponent {

  total = 10.00;

  cartService = inject(CartService)
  toastr = inject(ToastrService)

  onCheckout() {
    const emptyCart = this.cartService.cartCount() === 0
    if (emptyCart) {
      this.toastr.warning(`Your chart is empty.`, 'Warning', {
        progressBar: true,
      })
      return;
    }

    this.toastr.success(`Redirecting you to the checkout.`, 'Success', {
      progressBar: true,
    })
  }
}
