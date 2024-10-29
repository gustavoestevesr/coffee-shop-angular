import { computed, Injectable, signal, Signal } from '@angular/core';

import { Product } from '../products/product';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  // Computed signals for cart counts and totals
  cartCount = computed(() =>
    this.cartItems().reduce((acc, curr) => acc + curr.quantity, 0)
  );

  cartSubTotal = computed(() =>
    this.cartItems().reduce(
      (acc, curr) => acc + curr.quantity * curr.product.price,
      0
    )
  );

  cartTax = computed(() => this.cartSubTotal() * 0.08);

  cartTotal = computed(() => this.cartSubTotal() + this.cartTax());

  getCartItems(): Signal<CartItem[]> {
    return this.cartItems;
  }

  addProduct(product: Product): void {
    const currentItems = this.cartItems();
    const productFound = currentItems.find(
      (item) => item.product.id === product.id
    );

    if (productFound) {
      // If the product is already in the cart, increase its quantity
      this.cartItems.update((items) =>
        items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it
      this.cartItems.update((items) => [...items, { product, quantity: 1 }]);
    }
  }

  updateCartQuantity(cartItem: CartItem): void {
    this.cartItems.update(items =>
      items.map((item) => item.product.id === cartItem.product.id
      ? { ...item, quantity: cartItem.quantity }
      : item)
    )
  }

  removeProduct(product: Product): void {
    const itemFound = this.cartItems().findIndex((item) => item.product.id === product.id);
    if (itemFound !== -1) {
      this.cartItems.update((items) => {
        const updatedItems = [...items];
        updatedItems.splice(itemFound, 1);
        return updatedItems;
      });
    }
  }

}
