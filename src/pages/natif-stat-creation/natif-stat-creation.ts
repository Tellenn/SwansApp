import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character, Caracteristiques, Caracteristique } from '../home/home';
import { CharchoicePage } from '../charchoice/charchoice';
import { AttribStatCreationPage } from '../attrib-stat-creation/attrib-stat-creation';


@IonicPage()
@Component({
  selector: 'page-natif-stat-creation',
  templateUrl: 'natif-stat-creation.html',
})
export class NatifStatCreationPage {
  dices: number[]
  character: Character;
  error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.character = <Character> navParams.get("character");

    console.log(this.character);
    this.character.Caracteristiques = new Caracteristiques(new Caracteristique("CHA"), new Caracteristique("CON"), new Caracteristique("DEX"), new Caracteristique("FOR"), new Caracteristique("INT"), new Caracteristique("SAG"));
    this.dices = navParams.get("dices");
  }

  next() {
    let error: boolean = false;
    let errormsg: string = "";
    if (
      this.character.Caracteristiques.CHA.Natif == null ||
      this.character.Caracteristiques.DEX.Natif == null ||
      this.character.Caracteristiques.FOR.Natif == null ||
      this.character.Caracteristiques.CON.Natif == null ||
      this.character.Caracteristiques.INT.Natif == null ||
      this.character.Caracteristiques.SAG.Natif == null) {
      error = true;
      errormsg = "Une des cases est vide !";
    }
    if (!error) {
      this.character.Caracteristiques.CHA.Natif = +this.character.Caracteristiques.CHA.Natif;
      this.character.Caracteristiques.DEX.Natif = +this.character.Caracteristiques.DEX.Natif;
      this.character.Caracteristiques.FOR.Natif = +this.character.Caracteristiques.FOR.Natif;
      this.character.Caracteristiques.CON.Natif = +this.character.Caracteristiques.CON.Natif;
      this.character.Caracteristiques.INT.Natif = +this.character.Caracteristiques.INT.Natif;
      this.character.Caracteristiques.SAG.Natif = +this.character.Caracteristiques.SAG.Natif;
      console.log(this.character);
      this.error = "";
      this.navCtrl.push(AttribStatCreationPage, { dices: this.dices, character: this.character });
    } else {
      this.error = errormsg;
    }
  }
}
