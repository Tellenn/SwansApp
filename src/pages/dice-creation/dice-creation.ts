import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Character } from '../home/home';
import { NatifStatCreationPage } from '../natif-stat-creation/natif-stat-creation';

@IonicPage()
@Component({
  selector: 'page-dice-creation',
  templateUrl: 'dice-creation.html',
})
export class DiceCreationPage {
  character: Character;
  val: any;
  error: string = "";

  constructor(menuctrl : MenuController, public navCtrl: NavController, public navParams: NavParams) {
    menuctrl.enable(false);
    this.character = navParams.get("perso");
    this.error = "";
  }

  next() {
    let error: boolean = false;
    let errormsg: string;
    if (this.val == null) {
      error = true;
      errormsg = "Tu n'as pas rentré de valeur !";
    }
    if (!error) {
      this.error = "";
      console.log(this.character);
      this.navCtrl.push(NatifStatCreationPage, { dice: parseInt(this.val)+65, character: this.character });
    } else {
      this.error = errormsg;
    }
  }

}
