import { Component, Input } from '@angular/core';
import { CharchoicePage } from '../../pages/charchoice/charchoice';
import { NavController } from 'ionic-angular';
import { GmMenuPage } from '../../pages/gm-menu/gm-menu';

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
  @Input("title") title: string;
  static toGM: boolean;

  constructor(public navCtrl: NavController) {
  }
  changechar() {
    if (!HeaderComponent.toGM) {
      this.navCtrl.setRoot(CharchoicePage);
    } else {
      this.navCtrl.setRoot(GmMenuPage);
    }
  }
}
