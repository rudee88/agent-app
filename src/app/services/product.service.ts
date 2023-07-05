import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  getAll(): Product[] {
    return [
      {
        id: 1,
        name: 'Jus Synergy Pluz',
        price: 79.00,
        image: 'assets/items/jus-synergy-pluz.jpeg',
        shortDesc: 'Meningkatkan stamina badan',
        categoryId: 'c2'
      },{
        id: 2,
        name: 'Minyak Resdung Fresco',
        price: 19.90,
        image: 'assets/items/fresco.jpeg',
        shortDesc: 'Melegakan sakit resdung',
        categoryId: 'c1'
      },{
        id: 3,
        name: 'Minyak XXL Strongmen',
        price: 49.90,
        image: 'assets/items/minyak-xxl-strongmen.jpeg',
        shortDesc: 'Memanjangkan & Membesarkan senjata lelaki',
        categoryId: 'c3'
      },{
        id: 4,
        name: 'Minyak V-Dara',
        price: 39.90,
        image: 'assets/items/minyak-vdara.jpeg',
        shortDesc: 'Mengetatkan seperti zaman remaja',
        categoryId: 'c4'
      },
      {
        id: 89.00,
        name: 'Pil XXL Strongmen',
        price: 80,
        image: 'assets/items/pil-xxl-strongmen.jpeg',
        shortDesc: 'Meningkatkan stamina batin',
        categoryId: 'c3'
      },
    ];
  }

  constructor() { }
}
