import { Component, Input} from '@angular/core';

@Component({
  selector: 'bar',
  templateUrl: 'bar.html'
})
export class BarComponent {
  @Input('progress') progress;
  @Input('max') max;
  @Input('percent') percent;
  @Input('newcolor') newcolor;
  @Input('overcharge') overcharge;
  @Input('overpercent') overpercent;
  @Input('ishidden') ishidden;


  constructor() {
  }

}
