import { Component, Input } from '@angular/core';
import { CharchoicePage } from '../../pages/charchoice/charchoice';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input() title: string;

  constructor(public navCtrl: NavController) {
  }
  changechar() {
    this.navCtrl.setRoot(CharchoicePage);
  }
}
