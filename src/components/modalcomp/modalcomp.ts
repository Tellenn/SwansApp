import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { CalculatorProvider } from '../../providers/character/character';

@Component({
  selector: 'modalcomp',
  templateUrl: 'modalcomp.html'
})
export class ModalcompComponent {

  text: string;
  skill: Competence;
  calc: CalculatorProvider;
  value: number;

  constructor(params: NavParams, public viewCtrl: ViewController) {
    this.skill = <Competence>params.get("skill");
    this.value = <number>params.get("value");
    console.log(this.skill);
    console.log(this.value);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
export interface Competence {
  Nom: string;
  Base: string;
  Modif: number;
  Natif: number;
}
