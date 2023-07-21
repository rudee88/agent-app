import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { NavController, NavParams } from '@ionic/angular';

import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductDataService } from 'src/app/services/product-data.service';
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
  products: Product[] = [];
  cartData: any = {};
  storeCart: any = {};
  dummy = Array(10);
  isLoading: boolean;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    private productDataService: ProductDataService,
    private router: Router,
    private navParams: NavParams
  ) {}

  async ngOnInit() {
    this.products = this.productDataService.getProducts();
    this.route.paramMap.subscribe(async (paramMap) => {
      if (!paramMap.has('id')) {
        this.navCtrl.back();
        return;
      }

      this.storeCart = this.navParams.get('storeCart');
      if (this.storeCart && this.storeCart.value) {
        this.storeCart = JSON.parse(this.storeCart.value);
        this.product.forEach((element: any) => {
          const cartItem = this.storeCart.items.find((item: any) => item.id === element.id);
          if (cartItem) {
            element.quantity = cartItem.quantyty;
          }
        });
        this.cartData.totalItem = this.storeCart.totalItem;
        this.cartData.totalPrice = this.storeCart.totalPrice;
      }

      this.id = paramMap.get('id');
      this.isLoading = true;
      this.getItems().then(() => {
        this.isLoading = false;
      });
    });
  }

  ionViewWillEnter() {
    this.getItems();
  }

  async getItems() {
    this.category = {};
    this.categories = this.categoryService.getAll();
    this.allProducts = this.productService.getAll();
    this.storeCart = {};
    let cart = await this.getCart();
    console.log('stored cart: ', cart);
    if (cart?.value) {
      this.storeCart = JSON.parse(cart.value);
      // console.log('parse value: ', this.storeCart);
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
    let category = this.categories.filter((x) => x.id === this.id);
    this.category = category[0];
    this.products = this.allProducts.filter((x) => x.categoryId === this.id);
    this.product = this.products.map((item) => ({ ...item, quantity: 0 }));
    this.isLoading = false;
  }

  getCart() {
    return Preferences.get({ key: 'cart' });
  }

  getCartDataFromState() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state.storeCart) {
      this.storeCart = state.storeCart; // Fix the typo here
      this.product.forEach((element: any) => {
        const cartItem = this.storeCart.items.find((item: any) => item.id === element.id);
        if (cartItem) {
          element.quantity = cartItem.quantity;
        }
      });
      this.cartData.totalItem = this.storeCart.totalItem;
      this.cartData.totalPrice = this.storeCart.totalPrice;
    }
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

  async onQuantityPlus(index: number) {
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
      await this.saveProductsToStorage();
    } catch (e) {
      console.log(e);
    }
  }

  async onQuantityMinus(index: number) {
    if (this.product[index].quantity !== 0) {
      this.product[index].quantity -= 1;
    } else {
      this.product[index].quantity = 0;
    }
    this.calculate();
    await this.saveToCart();
    await this.saveProductsToStorage();
  }

  async onViewCart() {
    if (this.cartData.items && this.cartData.items.length > 0) {
      await this.saveToCart();
    }
  }
}
