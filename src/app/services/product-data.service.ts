import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private products: Product[] = [];

  constructor() { }

  setProducts(products: Product[]) {
    this.products = products;
  }

  getProducts() {
    return this.products;
  }
}
