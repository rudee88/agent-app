import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
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
  product: Product[] = [];
  cartData: any = {};
  products: any;
  dummy = Array(10);
  isLoading: boolean;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef
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
        this.product = this.products.map(item => ({ ...item, quantity: 0 }));

        this.isLoading = false;
      }, 3000);
    });
  }

  getItems() {
    this.category = {};
    let category = this.categories.filter((x) => x.id === this.id);
    this.category = category[0];
    this.products = this.allProducts.filter((x) => x.categoryId === this.id);
    console.log('Products:', this.products);
  }

  calculate() {
    // console.log(this.product);
    this.cartData.items = [];
    let item = this.product.filter((x) => x.quantity > 0);
    // console.log('Added item,', item);
    this.cartData.items = item;
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

  async saveToCart() {
    try {
      // console.log('cartData: ', this.cartData)
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData),
      });
    } catch (e) {
      console.log(e);
    }
  }

  onQuantityPlus(index: number) {
    try {
      console.log(this.product[index]);
      if (!this.product[index] || this.product[index].quantity === 0) {
        this.product[index].quantity = 1;
      } else {
        this.product[index].quantity += 1;
      }
      this.calculate();
      console.log('Updated product:', this.product);
      this.calculate();
      this.changeDetectorRef.markForCheck();
    } catch (e) {
      console.log(e);
    }
  }

  onQuantityMinus(index: number) {
    if (this.product[index].quantity !== 0) {
      this.product[index].quantity -= 1;
    } else {
      this.product[index].quantity = 0;
    }
    this.calculate();
  }

  async onViewCart() {
    if (this.cartData.items && this.cartData.items.length > 0) {
      await this.saveToCart();
    }
  }
}
