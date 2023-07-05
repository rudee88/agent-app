import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryItemPageRoutingModule } from './category-item-routing.module';

import { CategoryItemPage } from './category-item.page';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { ProductsLoadingModule } from 'src/app/components/products-loading/products-loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryItemPageRoutingModule,
    ProductCardModule,
    ProductsLoadingModule
  ],
  declarations: [CategoryItemPage]
})
export class CategoryItemPageModule {}
