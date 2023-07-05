import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsLoadingComponent } from './products-loading.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ProductsLoadingComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ProductsLoadingComponent]
})
export class ProductsLoadingModule { }
