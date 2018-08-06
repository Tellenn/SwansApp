import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-charchoice',
  templateUrl: 'charchoice.html',
})
export class CharchoicePage {
  names: string[];
  perso: Character;
  charnb: number;

  constructor(public afDatabase: AngularFireDatabase, public navCtrl: NavController) {
    let res = afDatabase.list('/Character').snapshotChanges();
    this.names = new Array<string>();
    res.subscribe(action => {
      console.log(action);
      for (let i = 0; i < action.length; i++) {
        let perso : Character = <Character> action[i].payload.val();
        this.names.push(perso.Nom);
      }
    });

  }

  validate() {
    if(this.charnb>=0){
      this.navCtrl.setRoot(HomePage,{charnb:this.charnb});
    }
    console.log(this.charnb);
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
  Modif: number;
  Natif: number;
  Score: number;
}


export interface Caracteristiques {
  Charisme: Caracteristique;
  Constitution: Caracteristique;
  Dexterite: Caracteristique;
  Force: Caracteristique;
  Intelligence: Caracteristique;
  Sagesse: Caracteristique;
}

export interface Skill {
  Modif: number;
  Natif: number;
}

export interface Competences {
  Acrobatie: Skill;
}

export interface Defense {
  CA: number;
  Moddex: number;
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

export interface Reputation {
  Nom: string;
  Valeur: number;
}

export interface Character {
  Age: number;
  Aptitudes: Aptitude[];
  Attaque: Attaque[];
  Caracteristiques: Caracteristiques;
  Cheveux: string;
  Competences: Competences;
  Defense: Defense[];
  Dextrie: string;
  Etat: Etat;
  Inventaire: Inventaire[];
  Joueur: string;
  Niveau: number;
  Nom: string;
  Reputation: Reputation[];
  Sexe: string;
  Taille: string;
  Yeux: string;
}
