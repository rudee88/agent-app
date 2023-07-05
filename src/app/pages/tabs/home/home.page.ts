import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isLoading: boolean = false;
  categories!: Category[];
  products!: Product[];
  dummy = Array(10);

  constructor(private categoriesService: CategoryService, private productServices: ProductService) { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.categories = this.categoriesService.getAll();
      this.products = this.productServices.getAll();
      this.isLoading = false;
    },3000);
    
  }

}
