import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.page.html',
  styleUrls: ['./category-item.page.scss'],
})
export class CategoryItemPage implements OnInit {
  id: string;
  category: any;
  categories: Category[];
  allProducts: Product[];
  products: any;
  dummy = Array(10);
  isLoading: boolean;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      // console.log('paramMap', paramMap);

      if (!paramMap.has('id')) {
        this.navCtrl.back();
        return;
      }

      this.id = paramMap.get('id');
      // console.log('id: ', this.id);
      
      this.isLoading = true;

      setTimeout(() => {
        this.categories = this.categoryService.getAll();
        this.allProducts = this.productService.getAll();
        this.getItems();
        this.isLoading = false;
      }, 3000);
    });
  }

  getItems() {
    this.category = {};
    let category = this.categories.filter((x) => x.id === this.id);
    this.category = category[0];
    this.products = this.allProducts.filter((x) => x.categoryId === this.id);
  }
}
