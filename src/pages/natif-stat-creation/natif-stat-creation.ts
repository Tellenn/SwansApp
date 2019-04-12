import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Character, Caracteristiques, Caracteristique } from '../../providers/character/character';
import { AttribStatCreationPage } from '../attrib-stat-creation/attrib-stat-creation';


@IonicPage()
@Component({
  selector: 'page-natif-stat-creation',
  templateUrl: 'natif-stat-creation.html',
})
export class NatifStatCreationPage {
  dice: number;
  character: Character;
  error: string;

  constructor(menuctrl : MenuController, public navCtrl: NavController, public navParams: NavParams) {
    menuctrl.enable(false);
    this.character = <Character> navParams.get("character");

    console.log(this.character);
    this.character.Caracteristiques = new Caracteristiques(new Caracteristique("CHA"), new Caracteristique("CON"), new Caracteristique("DEX"), new Caracteristique("FOR"), new Caracteristique("INT"), new Caracteristique("SAG"));
    this.dice = navParams.get("dice");
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
      this.navCtrl.push(AttribStatCreationPage, { dice: this.dice, character: this.character });
    } else {
      this.error = errormsg;
    }
  }
}
