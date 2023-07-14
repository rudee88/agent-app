import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelIcon } from 'src/app/models/icon-model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  query: any;
  products: Product[] = [];
  allProducts: Product[];
  isLoading: boolean;
  dummy = Array(10);
  model: ModelIcon = {
    icon: 'search-outline',
    color: 'primary',
    title: 'Please Search Product'
  }

  constructor(private productService: ProductService) {}

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
    this.allProducts = this.productService.getAll();
  }

  async onSearchBar(event) {
    // console.log('event: ', event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.products = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async () => {
        this.products = await this.allProducts.filter((element): any => {
          return element.name.toLowerCase().includes(this.query);
        });
        this.isLoading = false;
      }, 1000);
    }
    // console.log('products:', this.products);
  }
}
