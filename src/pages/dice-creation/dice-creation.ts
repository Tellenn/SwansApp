import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character } from '../sorts/sorts';
import { NatifStatCreationPage } from '../natif-stat-creation/natif-stat-creation';

/**
 * Generated class for the DiceCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dice-creation',
  templateUrl: 'dice-creation.html',
})
export class DiceCreationPage {
  character: Character;
  val1: number;
  val2: number;
  val3: number;
  val4: number;
  val5: number;
  val6: number;
  error: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.character = navParams.get("perso");
    this.error = "";
  }

  next() {
    let error: boolean = false;
    let errormsg: string;
    let dices: number[] = new Array<number>();
    if (this.val1 == null || this.val2 == null || this.val3 == null || this.val4 == null || this.val5 == null || this.val6 == null) {
      error = true;
      errormsg = "Un ou plusieur champ sont vides";
    } else {
      dices.push(+this.val1);
      dices.push(+this.val2);
      dices.push(+this.val3);
      dices.push(+this.val4);
      dices.push(+this.val5);
      dices.push(+this.val6);
      let sum: number = 0;
      for (let i = 0; i < dices.length; i++) {
        if (dices[i] > 18 || dices[i] < 3) {
          error = true;
          if (dices[i] > 18) {
            errormsg = "Les statistique du lancé " + (i + 1) + " sont trop elevée";
          } else {
            errormsg = "Les statistique du lancé " + (i + 1) + " sont trop basse";
          }
        }
        sum += dices[i];
      }
      console.log(dices);
      console.log(sum);
      if (!error && sum < 60) {
        error = true;
        errormsg = "Tes statistiques sont trop basses, refais un lancé";
      }
    }
    if (!error) {
      this.error = "";
      console.log(this.character);
      this.navCtrl.push(NatifStatCreationPage, { dices: dices, character: this.character });
    } else {
      this.error = errormsg;
    }
  }

}
