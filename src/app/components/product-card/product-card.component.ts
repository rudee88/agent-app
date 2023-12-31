import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent  implements OnInit {

  @Input() item: Product;
  @Input() index: number;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() minus: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    console.log('Received Item:', this.item); // Check the received item
  }

  onQuantityPlus() {
    this.add.emit(this.index);
  }

  onQuantityMinus() {
    this.minus.emit(this.index);
  }

}
