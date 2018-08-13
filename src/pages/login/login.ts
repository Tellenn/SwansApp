import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharchoicePage } from '../charchoice/charchoice';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  passwd:string;
  error:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.error = "";
    this.passwd = "";
  }

  login() {
    if (this.passwd == "iamgroot") {
      this.navCtrl.setRoot(CharchoicePage,{});
    }else{
      this.passwd = "";
      this.error = "Mauvais mot de passe !"
    }
  }

}
