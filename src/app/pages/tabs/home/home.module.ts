import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { CategoryItemModule } from 'src/app/components/category-item/category-item.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { HomeLoadingModule } from 'src/app/components/home-loading/home-loading.module';
import { ProductsLoadingModule } from 'src/app/components/products-loading/products-loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CategoryItemModule,
    ProductCardModule,
    HomeLoadingModule,
    ProductsLoadingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage],
})
export class HomePageModule {}
