import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BadgesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-badges',
  templateUrl: 'badges.html',
})
export class BadgesPage {
  @Input("fromgm") fromgm;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addBadges() {

  }

}
