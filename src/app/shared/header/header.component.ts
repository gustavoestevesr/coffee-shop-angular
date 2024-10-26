import { CartService } from './../../cart/cart.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [MatToolbar, MatIconButton, RouterLink, MatIcon, NgIf, AsyncPipe]
})
export class HeaderComponent {

  cartCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.cartCount$;
  }
}
