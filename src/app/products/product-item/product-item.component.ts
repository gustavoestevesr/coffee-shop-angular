import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() productSelected = new EventEmitter<Product>();

  addProductToCart(productSelected: Product) {
    this.productSelected.emit(productSelected);
  }
}
