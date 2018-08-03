import { Component, Input} from '@angular/core';

/**
 * Generated class for the MentalbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mentalbar',
  templateUrl: 'mentalbar.html'
})
export class MentalbarComponent {
  color:string;
  @Input('progress') progress;
  @Input('max') max;
  @Input('percent') percent;
  @Input('newcolor') newcolor;

  constructor() {
  }

}
