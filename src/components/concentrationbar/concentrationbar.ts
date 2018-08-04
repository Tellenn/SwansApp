import { Component , Input} from '@angular/core';

/**
 * Generated class for the ConcentrationbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'concentrationbar',
  templateUrl: 'concentrationbar.html'
})
export class ConcentrationbarComponent {

  color:string;
  @Input('progress') progress;
  @Input('max') max;
  @Input('percent') percent;
  @Input('newcolor') newcolor;

  constructor() {
  }
}
