import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getAll(): Category[] {
    return [
      { id: 'c1', name: 'Minyak Angin', image: 'assets/categories/IMG_6385.JPG' },
      { id: 'c2', name: 'Jus Kesihatan', image: 'assets/categories/synergy-pluz.jpeg' },
      { id: 'c3', name: 'Minyak Lelaki', image: 'assets/categories/xxl-strongmen.jpeg' },
      { id: 'c4', name: 'Minyak Angin', image: 'assets/categories/vdara-oil.jpeg' },
    ]
  }
}
