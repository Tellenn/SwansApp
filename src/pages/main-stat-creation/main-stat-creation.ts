import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Character, Caracteristique } from '../../providers/character/character';
import { ValidationCreationPage } from '../validation-creation/validation-creation';


@IonicPage()
@Component({
  selector: 'page-main-stat-creation',
  templateUrl: 'main-stat-creation.html',
})
export class MainStatCreationPage {
  character: Character;
  stats: Caracteristique[];
  val: number[];

  constructor(menuctrl : MenuController, public navCtrl: NavController, public navParams: NavParams) {
    menuctrl.enable(false);
    this.character = this.navParams.get("character");
    this.stats = new Array<Caracteristique>();
    this.val = new Array<number>();
    this.stats.push(this.character.Caracteristiques.CHA);
    this.val.push(+this.stats[0].Score +this.stats[0].Natif);
    this.stats.push(this.character.Caracteristiques.DEX);
    this.val.push(+this.stats[1].Score +this.stats[1].Natif);
    this.stats.push(this.character.Caracteristiques.CON);
    this.val.push(+this.stats[2].Score +this.stats[2].Natif);
    this.stats.push(this.character.Caracteristiques.FOR);
    this.val.push(+this.stats[3].Score +this.stats[3].Natif);
    this.stats.push(this.character.Caracteristiques.INT);
    this.val.push(+this.stats[4].Score +this.stats[4].Natif);
    this.stats.push(this.character.Caracteristiques.SAG);
    this.val.push(+this.stats[5].Score +this.stats[5].Natif);
  }

  next() {
    if (
      this.character.MainStat == "DEX" ||
      this.character.MainStat == "CHA" ||
      this.character.MainStat == "CON" ||
      this.character.MainStat == "FOR" ||
      this.character.MainStat == "INT" ||
      this.character.MainStat == "SAG") {
      this.navCtrl.push(ValidationCreationPage, {character: this.character });
    }
  }

}
