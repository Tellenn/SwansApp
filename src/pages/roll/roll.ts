import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-roll',
  templateUrl: 'roll.html',
})
export class RollPage {
  diceResult: number;
  number: number;
  face: number;
  decomposedResult : number[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.decomposedResult = new Array<number>();
  }
  

  result() {
    this.decomposedResult = new Array<number>();
    let sum : number = 0;
    for (let i = 0; i < this.number; i++) {
      this.decomposedResult.push(Math.floor(Math.random() * this.face) + 1);
      sum += this.decomposedResult[i];
    }
    this.face < 1 ? this.diceResult = 0 : this.diceResult = sum;
  }

}
