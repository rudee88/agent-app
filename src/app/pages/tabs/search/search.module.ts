import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { ProductsLoadingModule } from 'src/app/components/products-loading/products-loading.module';
import { EmptyScreenModule } from 'src/app/components/empty-screen/empty-screen.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    ProductCardModule,
    ProductsLoadingModule,
    EmptyScreenModule
    
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
