import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private products: Product[] = [];

  constructor() { }

  
}
