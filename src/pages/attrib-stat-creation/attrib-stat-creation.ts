import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character, Caracteristique } from '../home/home';
import { NatifCompCreationPage } from '../natif-comp-creation/natif-comp-creation';

@IonicPage()
@Component({
  selector: 'page-attrib-stat-creation',
  templateUrl: 'attrib-stat-creation.html',
})
export class AttribStatCreationPage {
  dice;: number;
  character: Character;
  error: string;
  stats: Caracteristique[];
  natif: number[];

  chosen: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.character = <Character>navParams.get("character");
    this.dice = navParams.get("dicee");
    this.stats = [this.character.Caracteristiques.CHA, this.character.Caracteristiques.CON, this.character.Caracteristiques.DEX, this.character.Caracteristiques.FOR, this.character.Caracteristiques.INT, this.character.Caracteristiques.SAG];
    this.chosen = ["CHA", "CHA", "CHA", "CHA", "CHA", "CHA"];
  }

  next() {

    let error: boolean = false;
    let errormsg: string = "";
    for (let i = 0; i < this.stats.length && i < this.dices.length && !error; i++) {
      switch (this.chosen[i]) {
        case "DEX":
          if (this.character.Caracteristiques.DEX.Score != 0) {
            error = true;
            errormsg = "La stats DEX à étée choisie deux fois ou plus !";
          } else {
            this.character.Caracteristiques.DEX.Score = this.dices[i];
          }
          break;
        case "CON":
          if (this.character.Caracteristiques.CON.Score != 0) {
            error = true;
            errormsg = "La stats CON à étée choisie deux fois ou plus !";
          } else {
            this.character.Caracteristiques.CON.Score = this.dices[i];
          } break;
        case "SAG":
          if (this.character.Caracteristiques.SAG.Score != 0) {
            error = true;
            errormsg = "La stats SAG à étée choisie deux fois ou plus !";
          } else {
            this.character.Caracteristiques.SAG.Score = this.dices[i];
          } break;
        case "INT":
          if (this.character.Caracteristiques.INT.Score != 0) {
            error = true;
            errormsg = "La stats INT à étée choisie deux fois ou plus !";
          } else {
            this.character.Caracteristiques.INT.Score = this.dices[i];
          } break;
        case "FOR":
          if (this.character.Caracteristiques.FOR.Score != 0) {
            error = true;
            errormsg = "La stats FOR à étée choisie deux fois ou plus !";
          } else {
            this.character.Caracteristiques.FOR.Score = this.dices[i];
          } break;
        case "CHA":
          if (this.character.Caracteristiques.CHA.Score != 0) {
            error = true;
            errormsg = "La stats CHA à étée choisie deux fois ou plus !";
          } else {
            this.character.Caracteristiques.CHA.Score = this.dices[i];
          } break;
        default:
          error = true;
          errormsg = "Unknown Error";
          break;
      }
    }
    if (!error) {
      this.navCtrl.push(NatifCompCreationPage, { character: this.character });
    } else {
      this.character.Caracteristiques.CHA.Score = 0;
      this.character.Caracteristiques.DEX.Score = 0;
      this.character.Caracteristiques.FOR.Score = 0;
      this.character.Caracteristiques.INT.Score = 0;
      this.character.Caracteristiques.SAG.Score = 0;
      this.character.Caracteristiques.CON.Score = 0;
      this.error = errormsg;
    }
  }

}
