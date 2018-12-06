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
  @Input('hidden') hidden;
  notHidden: boolean = true;


  constructor() {
    if (this.hidden) {
      this.notHidden = false;
    }
  }

}
