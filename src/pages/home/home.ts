import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { CalculatorProvider } from '../../providers/character/character';
import { CharchoicePage } from '../charchoice/charchoice';
import { EditComponent, line } from '../../components/edit/edit';
import { LevelupPage } from '../levelup/levelup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  static charnb: number;
  static level: number;

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

  lifecolor: string;
  mentalcolor: string;
  fatiguecolor: string;
  concentrationcolor: string;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase, calculator: CalculatorProvider, navParam: NavParams, public modalCtrl: ModalController) {
    this.lifecolor = "darkred";
    this.mentalcolor = "darkgreen";
    this.fatiguecolor = "darkorange";
    this.concentrationcolor = "teal";

    console.log(HomePage.charnb);
    let temp = navParam.get("charnb");
    if (temp != null) {
      HomePage.charnb = temp;
    }
    this.database = afDatabase;
    this.age = 5;
    this.char = afDatabase.object('/Character/' + HomePage.charnb).snapshotChanges();
    this.char.subscribe(action => {
      console.log(action.payload.val());
      this.character = action.payload.val();

      HomePage.level = this.character.Niveau;


      this.maxLife = calculator.calcmodif(this.character.Caracteristiques.CON) + 8;
      if (this.character.Etat.Vie > this.maxLife) {
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Vie: this.maxLife });
      }
      this.percentLife = this.character.Etat.Vie / this.maxLife * 100;

      this.maxMental = calculator.calcmodif(this.character.Caracteristiques.CON) * 2 + 20;
      if (this.character.Etat.Mental > this.maxMental) {
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Mental: this.maxMental });
      }
      this.percentMental = this.character.Etat.Mental / this.maxMental * 100;

      this.maxFatigue = 10;
      if (this.character.Etat.Fatigue > this.maxFatigue) {
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Fatigue: this.maxFatigue });
      }
      this.percentFatigue = this.character.Etat.Fatigue / this.maxFatigue * 100;

      switch (this.character.MainStat) {
        case "DEX":
          this.maxConcentration = 2 * (this.character.Caracteristiques.DEX.Score + this.character.Caracteristiques.DEX.Modif + this.character.Caracteristiques.DEX.Natif);
          break;
        case "CON":
          this.maxConcentration = 2 * (this.character.Caracteristiques.CON.Score + this.character.Caracteristiques.CON.Modif + this.character.Caracteristiques.CON.Natif);
          break;
        case "SAG":
          this.maxConcentration = 2 * (this.character.Caracteristiques.SAG.Score + this.character.Caracteristiques.SAG.Modif + this.character.Caracteristiques.SAG.Natif);
          break;
        case "INT":
          this.maxConcentration = 2 * (this.character.Caracteristiques.INT.Score + this.character.Caracteristiques.INT.Modif + this.character.Caracteristiques.INT.Natif);
          break;
        case "FOR":
          this.maxConcentration = 2 * (this.character.Caracteristiques.FOR.Score + this.character.Caracteristiques.FOR.Modif + this.character.Caracteristiques.FOR.Natif);
          break;
        case "CHA":
          this.maxConcentration = 2 * (this.character.Caracteristiques.CHA.Score + this.character.Caracteristiques.CHA.Modif + this.character.Caracteristiques.CHA.Natif);
          break;
        default:
          this.maxConcentration = 0;
          break;
      }
      if (this.character.Etat.Concentration > this.maxConcentration) {
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Concentration: this.maxConcentration });
      }
      this.percentConcentration = this.character.Etat.Concentration / this.maxConcentration * 100;
    });

  }

  addLife() {
    let newlife = +this.character.Etat.Vie + 1;
    console.log("add life : " + newlife + " / " + this.maxLife);
    if (newlife <= this.maxLife) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Vie: newlife });
    }
  }
  removeLife() {
    let newlife = +this.character.Etat.Vie - 1;
    if (newlife >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Vie: newlife });
    }
  }

  addMental() {
    let newmental = +this.character.Etat.Mental + 1;
    if (newmental <= this.maxMental) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Mental: newmental });
    }
  }
  removeMental() {
    let newmental = this.character.Etat.Mental - 1;
    if (newmental >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Mental: newmental });
    }
  }

  addFatigue() {
    let newfatigue = +this.character.Etat.Fatigue + 1;
    if (newfatigue <= this.maxFatigue) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Fatigue: newfatigue });
    }
  }
  removeFatigue() {
    let newfatigue = +this.character.Etat.Fatigue - 1;
    if (newfatigue >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Fatigue: newfatigue });
      if (newfatigue / this.maxFatigue < this.character.Etat.Concentration / this.maxConcentration) {
        let newconcentration = Math.floor(newfatigue / this.maxFatigue * this.maxConcentration);
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Concentration: newconcentration });
      }
    }
  }

  addConcentration() {
    let newconcentration = +this.character.Etat.Concentration + 1;
    if (newconcentration <= this.maxConcentration) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Concentration: newconcentration });
    }
  }
  removeConcentration() {
    let newconcentration = +this.character.Etat.Concentration - 1;
    if (newconcentration >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Concentration: newconcentration });
    }
  }

  set(stuff: string, val: number, max: number) {
    let params:line[] = new Array<line>();
    params.push(new line(stuff,val,stuff));
    this.modalCtrl.create(EditComponent, { delete: false, params:params, path: "/Character/" + HomePage.charnb + "/Etat/"}).present();
  }

  levelup(){
    this.navCtrl.push(LevelupPage, {path: "/Character/" + HomePage.charnb});
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
  Nom: string;
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
  MainStat: string;
}

