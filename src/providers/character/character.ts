import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Injectable()
export class CalculatorProvider {

  constructor() {
  }

  calcmodif(carac: Caracteristique, bonus:number=0) {
    let sum = carac.Natif + carac.Modif + carac.Score + bonus;
    if(carac.Nom.match("CON")){
      sum+=HomePage.level-1;
    }
    let mod;
    if (sum > 10)
      mod = Math.floor((sum - 10) / 2);
    else
      mod = -Math.ceil((10 - sum) / 2);
    return mod;
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
