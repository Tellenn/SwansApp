import { Component } from '@angular/core';
import { Character } from '../../pages/home/home';
import { GmMenuPage } from '../../pages/gm-menu/gm-menu';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'modal-filter',
  templateUrl: 'modal-filter.html'
})
export class ModalFilterComponent {

  characters: string[];
  names: string[];
  newChoice: boolean[];

  constructor(public viewCtrl: ViewController, params: NavParams) {
    this.characters = params.get("characters");
    this.names = params.get("names");
    console.log(this.characters);
    this.newChoice = new Array<boolean>();
    for (let i = 0; i < this.characters.length; i++) {
      this.newChoice.push(GmMenuPage.chosen[i]);
    }
  }

  validate() {
    GmMenuPage.chosen = this.newChoice;
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
