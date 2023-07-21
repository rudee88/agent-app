import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';

import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductDataService } from 'src/app/services/product-data.service';
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
  products: Product[] = [];
  cartData: any = {};
  storeCart: any = {};
  dummy = Array(10);

  constructor(
    private categoriesService: CategoryService,
    private productServices: ProductService,
    private productDataService: ProductDataService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.products = this.productDataService.getProducts();
    this.isLoading = true;
    setTimeout(() => {
      this.getItems();
      this.fetchCartData();
      this.isLoading = false;
    }, 3000);
  }

  getCart() {
    return Preferences.get( {key: 'cart'} );
  }

  async getItems() {
    this.categories = this.categoriesService.getAll();
    this.product = this.productServices.getAll();
    this.storeCart = {}

    this.product.forEach((item) => {
      item.quantity = 0;
    });
  
  }

  async fetchCartData() {
    let cart: any = await this.getCart();
    // console.log('storeCart: ', cart);
    if (cart?.value) {
      this.storeCart = JSON.parse(cart.value);
      // console.log('cartValue:', this.storeCart);
      if (this.product.length > 0) {
        this.product.forEach((element: any) => {
          const cartItem = this.storeCart.items.find((item: any) => item.id === element.id);
          if (cartItem) {
            element.quantity = cartItem.quantity;
          }
        });
      }
      this.cartData.totalItem = this.storeCart.totalItem;
      this.cartData.totalPrice = this.storeCart.totalPrice;
    }
  }

  async saveProductsToStorage() {
    try {
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.product),
      });
      this.productDataService.setProducts(this.products);
    } catch (e) {
      console.log(e);
    }
  }

  viewCategory(categoryId: string) {
    this.navCtrl.navigateForward(['/tabs/category-item', categoryId], {
      state: { storeCart: this.storeCart } // Pass storeCart data as a parameter
    });
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

  async onQuantityPlus(index) {
    try {
      // console.log(this.product[index]);
      if (!this.product[index] || this.product[index].quantity === 0) {
        this.product[index].quantity = 1;
      } else {
        this.product[index].quantity += 1;
      }
      this.calculate();
      await this.saveProductsToStorage();
    } catch (e) {
      console.log(e);
    }
  }

  async onQuantityMinus(index) {
    if (this.product[index].quantity !== 0) {
      this.product[index].quantity -= 1;
    } else {
      this.product[index].quantity = 0;
    }
    this.calculate();
    await this.saveProductsToStorage();
  }

  async onViewCart() {
    if (this.cartData.items && this.cartData.items.length > 0) {
      await this.saveToCart();
    }
  }
}
