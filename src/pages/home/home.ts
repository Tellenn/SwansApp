import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { CalculatorProvider } from '../../providers/character/character';
import { CharchoicePage } from '../charchoice/charchoice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  static charnb:number;
  static level:number;

  database: AngularFireDatabase;
  character: Character;

  age: number;
  char: Observable<any>;

  maxLife: number;
  percentLife: number;

  maxMental: number;
  percentMental: number;

  maxFatigue: number;
  percentFatigue: number;

  maxConcentration: number;
  percentConcentration: number;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase, calculator: CalculatorProvider, navParam: NavParams) {
    console.log(HomePage.charnb);
    let temp = navParam.get("charnb");
    if(temp != null){
      HomePage.charnb = temp;
    }
    this.database = afDatabase;
    this.age = 5;
    this.char = afDatabase.object('/Character/'+HomePage.charnb).snapshotChanges();
    this.char.subscribe(action => {
      console.log(action.payload.val());
      this.character = action.payload.val();

      HomePage.level = this.character.Niveau;

      this.maxLife = calculator.calcmodif(this.character.Caracteristiques.CON)+8;
      this.percentLife = this.character.Etat.Vie / this.maxLife * 100;

      this.maxMental = calculator.calcmodif(this.character.Caracteristiques.CON)*2 + 20;
      this.percentMental = this.character.Etat.Mental / this.maxMental * 100;

      this.maxFatigue = 10;
      this.percentFatigue = this.character.Etat.Fatigue / this.maxFatigue * 100;

      this.maxConcentration = 40;
      this.percentConcentration = this.character.Etat.Concentration / this.maxConcentration * 100;
    });

  }

  addLife() {
    let newlife = this.character.Etat.Vie + 1;
    this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Vie: newlife });
  }
  removeLife() {
    let newlife = this.character.Etat.Vie - 1;
    this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Vie: newlife });
  }

  addMental() {
    let newmental = this.character.Etat.Mental + 1;
    this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Mental: newmental });
  }
  removeMental() {
    let newmental = this.character.Etat.Mental - 1;
    this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Mental: newmental });
  }

  addFatigue() {
    let newfatigue = this.character.Etat.Fatigue + 1;
    this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Fatigue: newfatigue });
  }
  removeFatigue() {
    let newfatigue = this.character.Etat.Fatigue - 1;
    this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Fatigue: newfatigue });
    if (newfatigue / this.maxFatigue < this.character.Etat.Concentration / this.maxConcentration) {
      let newconcentration = newfatigue / this.maxFatigue * this.maxConcentration;
      this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Concentration: newconcentration });
    }

  }

  addConcentration() {
    let newconcentration = this.character.Etat.Concentration + 1;
    this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Concentration: newconcentration });
  }
  removeConcentration() {
    let newconcentration = this.character.Etat.Concentration - 1;
    this.database.object('/Character/'+HomePage.charnb+'/Etat').update({ Concentration: newconcentration });
  }

  changechar(){
    this.navCtrl.setRoot(CharchoicePage);
  }
}
export interface Aptitude {
  Concentration: number;
  LifeCondition: number;
  Nom: string;
  Palier: number;
}

export interface Attaque {
  Attaque: number;
  Critique: string;
  Degats: number;
  Nom: string;
  Temporalite: string;
}

export interface Caracteristique {
  Nom:string;
  Modif: number;
  Natif: number;
  Score: number;
}


export interface Caracteristiques {
  CHA: Caracteristique;
  CON: Caracteristique;
  DEX: Caracteristique;
  FOR: Caracteristique;
  INT: Caracteristique;
  SAG: Caracteristique;
}

export interface Competence {
  Nom: string;
  Base: string;
  Modif: number;
  Natif: number;
}

export interface Defense {
  CA: number;
  ModDex: number;
  Nom: string;
  Temporalite: string;
}

export interface Etat {
  Concentration: number;
  Fatigue: number;
  Mental: number;
  Vie: number;
}

export interface Inventaire {
  Nom: string;
  Temporalite: string;
}


export interface Champ {
  Nom: string;
  Valeur: number;
}

export interface Character {
  Age: number;
  Aptitudes: Aptitude[];
  Attaque: Attaque[];
  Caracteristiques: Caracteristiques;
  Cheveux: string;
  Competences: Competence[];
  Defense: Defense[];
  Dextrie: string;
  Etat: Etat;
  Inventaire: Inventaire[];
  Monnaie: Champ[];
  Joueur: string;
  Niveau: number;
  Nom: string;
  Reputation: Champ[];
  Sexe: string;
  Taille: string;
  Yeux: string;
}

