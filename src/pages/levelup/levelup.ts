import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
import { JsonpCallbackContext } from '../../../node_modules/@angular/common/http/src/jsonp';

/**
 * Generated class for the LevelupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-levelup',
  templateUrl: 'levelup.html',
})
export class LevelupPage {
  stat1: Caracteristique;
  stat2: Caracteristique;
  comp1: number;
  comp2: number;
  comp3: number;
  comp4: number;
  comp5: number;
  comps: Competence[];
  dicocomp: string[];
  stats: Caracteristique[];
  path: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    this.path = navParams.get("path");
    afDatabase.list(this.path + "/Competences").snapshotChanges().subscribe(action => {
      this.comps = new Array<Competence>();
      this.dicocomp = new Array<string>();
      for (let i = 0; i < action.length; i++) {
        this.comps.push(<Competence>action[i].payload.val());
        this.dicocomp.push(action[i].key);
      }
    });
    afDatabase.object(this.path + "/Caracteristiques").snapshotChanges().subscribe(action => {
      this.stats = new Array<Caracteristique>();
      let allstats: Caracteristiques = <Caracteristiques>action.payload.val();
      this.stats.push(allstats.CHA);
      this.stats.push(allstats.CON);
      this.stats.push(allstats.FOR);
      this.stats.push(allstats.DEX);
      this.stats.push(allstats.INT);
      this.stats.push(allstats.SAG);
    });
  }
  validate() {
    this.afDatabase.object(this.path).update({ Niveau: HomePage.level + 1 });

    if (this.stat1 == this.stat2) {
      this.afDatabase.object(this.path + "/Caracteristiques/" + this.stat1.Nom).update({ Modif: +this.stat1.Modif + 2 });
    } else {
      this.afDatabase.object(this.path + "/Caracteristiques/" + this.stat1.Nom).update({ Modif: +this.stat1.Modif + 1 });
      this.afDatabase.object(this.path + "/Caracteristiques/" + this.stat2.Nom).update({ Modif: +this.stat2.Modif + 1 });
    }
    for (let i = 0 ; i< this.dicocomp.length ; i++){
      let count = 0;
      if(this.comp1 == i){
        count++;
      }
      if(this.comp2 == i){
        count++;
      }
      if(this.comp3 == i){
        count++;
      }
      if(this.comp4 == i){
        count++;
      }
      if(this.comp5 == i){
        count++;
      }
      if(count > 0){
        this.afDatabase.object(this.path + "/Competences/" + this.dicocomp[i]).update({ Modif: +this.comps[i].Modif + count });
      }
    }

    this.navCtrl.pop();
  }
  back() {
    this.navCtrl.pop();
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
