import { Component, Input} from '@angular/core';

/**
 * Generated class for the MentalbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bar',
  templateUrl: 'bar.html'
})
export class BarComponent {
  @Input('progress') progress;
  @Input('max') max;
  @Input('percent') percent;
  @Input('newcolor') newcolor;


  constructor() {
    console.log(this.newcolor);
  }

}
