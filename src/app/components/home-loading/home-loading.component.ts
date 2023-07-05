import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-loading',
  templateUrl: './home-loading.component.html',
  styleUrls: ['./home-loading.component.scss'],
})
export class HomeLoadingComponent  implements OnInit {

  @Input('isLoading') isLoading: boolean;

  constructor() { }

  ngOnInit() {}

}
