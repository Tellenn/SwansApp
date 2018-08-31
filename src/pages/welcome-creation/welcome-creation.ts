import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NamingCreationPage } from '../naming-creation/naming-creation';

@IonicPage()
@Component({
  selector: 'page-welcome-creation',
  templateUrl: 'welcome-creation.html',
})
export class WelcomeCreationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  next() {
    this.navCtrl.push(NamingCreationPage, {});
  }

}
