import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryItemPageRoutingModule } from './category-item-routing.module';

import { CategoryItemPage } from './category-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryItemPageRoutingModule
  ],
  declarations: [CategoryItemPage]
})
export class CategoryItemPageModule {}
