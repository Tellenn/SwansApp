import { Component, Input } from '@angular/core';


@Component({
  selector: 'lifebar',
  templateUrl: 'lifebar.html'
})
export class LifebarComponent {

  color:string;
  @Input('progress') progress;
  @Input('max') max;
  @Input('percent') percent;
  @Input('newcolor') newcolor;

  constructor() {
  }

}
