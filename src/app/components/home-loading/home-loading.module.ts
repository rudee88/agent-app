import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLoadingComponent } from './home-loading.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [HomeLoadingComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HomeLoadingComponent]
})
export class HomeLoadingModule { }
