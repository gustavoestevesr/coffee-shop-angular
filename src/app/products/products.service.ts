import { inject, Injectable, signal, Signal } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products = signal<Product[]>([]);

  private readonly API = `/products`;
  private readonly isLocal = true;
  private listLoaded = false

  http = inject(HttpClient)

  load(): Signal<Product[]> {
    if (this.isLocal) {
      if (!this.listLoaded) {
        this.listLoaded = true;
        for (let num = 1; num <= 10; num++) {
          this.addProducts(num);
        }
      }
      return this.products; // Return the signal directly
    } else {
      this.http.get<Product[]>(this.API).subscribe((data) => {
        this.products.set(data); // Update the signal with fetched products
      });
    }
    return this.products; // Return the signal even if not yet updated
  }

  create(product: Product): Signal<Product[]> {
    if (this.isLocal) {
      this.products.update((currentProducts) => [...currentProducts, product]); // Adiciona o novo produto ao signal
      return this.products; // Retorna o signal atualizado
    }

    // Se não for local, faz a requisição POST e retorna o signal.
    this.http.post<Product>(this.API, product).subscribe((newProduct) => {
      this.products.update((currentProducts) => [...currentProducts, newProduct]); // Atualiza o signal com o novo produto
    });

    return this.products; // Retorna o signal, mesmo que não tenha sido atualizado ainda
  }

  private addProducts(i: number): void {
    this.products.update((currentProducts) => [
      ...currentProducts,
      {
        id: `${i}`,
        price: parseFloat((Math.random() * (0.0 - 10.0) + 10.0).toFixed(2)),
        status: ['', '', '', 'sale'][Math.floor(Math.random() * 4)],
        discounted: ['', '', '', 'discounted'][Math.floor(Math.random() * 4)],
        discount: parseFloat((Math.random() * (0.0 - 10.0) + 10.0).toFixed(2)),
        name: ['Coffee'][Math.floor(Math.random() * 1)],
        description: ['B & W', 'Grey', 'Black', 'Green', 'Black'][Math.floor(Math.random() * 5)],
        image: `${i}`
      }
    ]);
  }
}
