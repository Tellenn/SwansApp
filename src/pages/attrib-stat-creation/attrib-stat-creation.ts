import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Character, Caracteristique } from '../home/home';
import { NatifCompCreationPage } from '../natif-comp-creation/natif-comp-creation';

@IonicPage()
@Component({
  selector: 'page-attrib-stat-creation',
  templateUrl: 'attrib-stat-creation.html',
})
export class AttribStatCreationPage {
  dice: number;
  character: Character;
  error: string;
  stats: Caracteristique[];
  natif: number[];
  chosenValues: number[] = [0,0,0,0,0,0];
  tempTotal: number = 0;

  constructor(menuctrl : MenuController, public navCtrl: NavController, public navParams: NavParams) {
    menuctrl.enable(false);
    this.chosenValues = new Array<number>();
    for(let i = 0; i<6 ;i++){
      this.chosenValues.push(0);
    }
    this.character = <Character>navParams.get("character");
    this.dice = navParams.get("dice");
    this.stats = [this.character.Caracteristiques.CHA, this.character.Caracteristiques.CON, this.character.Caracteristiques.DEX, this.character.Caracteristiques.FOR, this.character.Caracteristiques.INT, this.character.Caracteristiques.SAG];
  }

  update(){
    let newTotal:number = 0;
    this.chosenValues.forEach(function(val){
      newTotal += +val;
    })
    this.tempTotal = newTotal;
  }
  next() {
    let error: boolean = false;
    let errormsg: string = "";
    if(this.tempTotal > this.dice){
      error = true;
      errormsg = "Tu t'es ajouté un peu trop de point non ?";
    }
    if(!error) {
      this.character.Caracteristiques.CHA.Score = +this.chosenValues[0];
      this.character.Caracteristiques.CON.Score = +this.chosenValues[1];
      this.character.Caracteristiques.DEX.Score = +this.chosenValues[2];
      this.character.Caracteristiques.FOR.Score = +this.chosenValues[3];
      this.character.Caracteristiques.INT.Score = +this.chosenValues[4];
      this.character.Caracteristiques.SAG.Score = +this.chosenValues[5];
      this.navCtrl.push(NatifCompCreationPage, { character: this.character });
    } else {
      this.error = errormsg;
    }
  }

}
