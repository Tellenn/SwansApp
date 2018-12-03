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
    console.log("Why is there a delay here ? :(");
  }

  next() {
    console.log("clicked");
    this.navCtrl.push(NamingCreationPage, {});
  }

}
