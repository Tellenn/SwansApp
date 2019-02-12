import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { NamingCreationPage } from '../naming-creation/naming-creation';

@IonicPage()
@Component({
  selector: 'page-welcome-creation',
  templateUrl: 'welcome-creation.html',
})
export class WelcomeCreationPage {

  constructor(menuctrl : MenuController, public navCtrl: NavController, public navParams: NavParams) {
    menuctrl.enable(false);
  }

  next() {
    this.navCtrl.push(NamingCreationPage, {});
  }

}
