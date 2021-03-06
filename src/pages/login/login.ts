import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CharchoicePage } from '../charchoice/charchoice';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  password: string = "iamgroot";
  passwd:string;
  error:string;
  constructor(menuctrl : MenuController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    menuctrl.enable(false);
    this.error = "";
    this.passwd = "";
  }

  login() {
    if (this.passwd == this.password) {
      this.storage.set('password', this.passwd);
      this.navCtrl.setRoot(CharchoicePage,{});
    }else{
      this.passwd = "";
      this.error = "Mauvais mot de passe !"
    }
  }

}
