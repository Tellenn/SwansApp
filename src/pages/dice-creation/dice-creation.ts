import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character } from '../home/home';
import { NatifStatCreationPage } from '../natif-stat-creation/natif-stat-creation';

@IonicPage()
@Component({
  selector: 'page-dice-creation',
  templateUrl: 'dice-creation.html',
})
export class DiceCreationPage {
  character: Character;
  val: number;
  error: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.character = navParams.get("perso");
    this.error = "";
  }

  next() {
    let error: boolean = false;
    let errormsg: string;
    if (this.val == null) {
      error = true;
      errormsg = "Tu n'as pas rentré de valeur !";
    } else {
      dices.push(+this.val);
    }
    if (!error) {
      this.error = "";
      console.log(this.character);
      this.navCtrl.push(NatifStatCreationPage, { dice: this.val, character: this.character });
    } else {
      this.error = errormsg;
    }
  }

}
