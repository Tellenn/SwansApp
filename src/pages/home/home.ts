import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  character: Character;
  age: number;
  char: Observable<any>;
  maxLife:number;
  percentLife:number;
  maxMental:number;
  percentMental:number;
  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase) {
    this.age = 5;
    this.char = afDatabase.object('/Character/0').snapshotChanges();
    this.char.subscribe(action => {
      console.log(action.payload.val());
      this.character = action.payload.val();
      this.maxLife = (this.character.Niveau-1+this.character.Caracteristiques.Constitution.Score+this.character.Caracteristiques.Constitution.Natif+this.character.Caracteristiques.Constitution.Modif-10)/2+8;
      this.percentLife = this.character.Etat.Vie/this.maxLife*100;
      this.maxMental = (this.character.Niveau-1+this.character.Caracteristiques.Constitution.Score+this.character.Caracteristiques.Constitution.Natif+this.character.Caracteristiques.Constitution.Modif-10)+20;
      this.percentMental = this.character.Etat.Mental/this.maxMental*100;
    });

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

export interface Charisme {
    Modif: number;
    Natif: number;
    Score: number;
}

export interface Constitution {
    Modif: number;
    Natif: number;
    Score: number;
}

export interface Dexterite {
    Modif: number;
    Natif: number;
    Score: number;
}

export interface Force {
    Modif: number;
    Natif: number;
    Score: number;
}

export interface Intelligence {
    Modif: number;
    Natif: number;
    Score: number;
}

export interface Sagesse {
    Modif: number;
    Natif: number;
    Score: number;
}

export interface Caracteristiques {
    Charisme: Charisme;
    Constitution: Constitution;
    Dexterite: Dexterite;
    Force: Force;
    Intelligence: Intelligence;
    Sagesse: Sagesse;
}

export interface Acrobatie {
    Modif: number;
    Natif: number;
}

export interface Competences {
    Acrobatie: Acrobatie;
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

