import { Component, Input, OnInit } from '@angular/core';
import { ModelIcon } from 'src/app/models/icon-model';

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
})
export class EmptyScreenComponent  implements OnInit {

  @Input() model: ModelIcon;

  constructor() { }

  ngOnInit() {}

}
