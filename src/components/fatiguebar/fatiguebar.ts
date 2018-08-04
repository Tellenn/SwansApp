import { Component, Input } from '@angular/core';

/**
 * Generated class for the FatiguebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fatiguebar',
  templateUrl: 'fatiguebar.html'
})
export class FatiguebarComponent {

  color:string;
  @Input('progress') progress;
  @Input('max') max;
  @Input('percent') percent;
  @Input('newcolor') newcolor;

  constructor() {
  }

}
