import { Component, Input } from '@angular/core';

@Component({
  selector: 'life-bar',
  templateUrl: 'progressbar.html'
})

export class ProgressbarComponent {
  color:string;
  @Input('progress') progress;
  @Input('max') max;
  @Input('percent') percent;
  @Input('newcolor') newcolor;
  constructor() {
  }
 
}