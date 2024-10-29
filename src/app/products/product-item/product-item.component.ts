import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../product';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() productSelected = new EventEmitter<Product>();

  toastr = inject(ToastrService)

  addProductToCart(productSelected: Product) {
    this.toastr.success(`Product added into the cart.`, 'Success', {
      progressBar: true,
    })
    this.productSelected.emit(productSelected);
  }
}
