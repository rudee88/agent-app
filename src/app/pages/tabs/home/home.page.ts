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
  product: Product[] = [];
  cartData: any = {};
  dummy = Array(10);

  constructor(
    private categoriesService: CategoryService,
    private productServices: ProductService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.getItems();
      this.isLoading = false;
    }, 3000);
  }

  getItems() {
    this.categories = this.categoriesService.getAll();
    this.product = this.productServices.getAll();

    this.product.forEach((item) => {
      item.quantity = 0;
    });
  }

  calculate() {
    // console.log(this.product);
    this.cartData.items = [];
    let item = this.product.filter((x) => x.quantity > 0);
    // console.log('Added item,', item);
    this.cartData.item = item;
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach((element) => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice +=
        parseFloat(element.price.toString()) *
        parseFloat(element.quantity.toString());
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if (this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    // console.log('cart: ', this.cartData);
  }

  onQuantityPlus(index) {
    try {
      // console.log(this.product[index]);
      if (!this.product[index] || this.product[index].quantity === 0) {
        this.product[index].quantity = 1;
      } else {
        this.product[index].quantity += 1;
      }
      this.calculate();
    } catch (e) {
      console.log(e);
    }
  }

  onQuantityMinus(index) {
    if (this.product[index].quantity !== 0) {
      this.product[index].quantity -= 1;
    } else {
      this.product[index].quantity = 0;
    }
    this.calculate();
  }

  onViewCart() {
    
  }
 }
