import { Injectable } from '@angular/core';
import { Caracteristique } from '../../pages/home/home';

@Injectable()
export class CalculatorProvider {

  constructor() {
  }

  calcmodif(carac: Caracteristique, bonus:number=0) {
    let sum = carac.Natif + carac.Modif + carac.Score + bonus;
    let mod;
    if (sum > 10)
      mod = Math.floor((sum - 10) / 2);
    else
      mod = -Math.ceil((10 - sum) / 2);
    return mod;
  }
  getLevel() {

  }
  getMaxLife(charId: number) {
    throw new Error('Function not yet defined');
  }
  getMaxMentalLife(charId: number) {
    throw new Error('Function not yet defined');
  }
  getMaxWeariness(charId: number) {
    throw new Error('Function not yet defined');
  }
  getMaxFocus(charId: number) {
    throw new Error('Function not yet defined');
  }

  getMainStat(charId: number) {
    switch (this.character.MainStat) {
      case "DEX":
        return this.character.Caracteristiques.DEX;
      case "CON":
        return this.character.Caracteristiques.CON;
      case "SAG":
        return this.character.Caracteristiques.SAG;
      case "INT":
        return this.character.Caracteristiques.INT;
      case "FOR":
        return this.character.Caracteristiques.FOR;
      case "CHA":
        return this.character.Caracteristiques.CHA;
      default:
        throw new Error('MainStat not found');
    }
  }

  getExpToNextLevel(charId: number) {
    this.sub = afDatabase.object('/Character/' + HomePage.charnb).snapshotChanges().subscribe(action => {
      this.character = <Character>action.payload.val();

      HomePage.level = this.character.Niveau;
      HomePage.exp = this.character.Experience;

      if (HomePage.level == 1) {
        this.maxExperience = 500;
      } else {
        this.maxExperience = 1000 + 100 * (HomePage.level - 1);
      }
      this.percentExperience = this.character.Experience / this.maxExperience * 100;
    });
  }
}

export class Aptitude {
  Concentration: number;
  LifeCondition: number;
  Nom: string;
  Palier: number;
  constructor(Nom: string = "", Concentration: number = 0, LifeCondition: number = 0, Palier: number = 0) {
    this.Nom = Nom;
    this.Concentration = Concentration;
    this.LifeCondition = LifeCondition;
    this.Palier = Palier;
  }
}

export class Attaque {
  Attaque: number;
  Critique: string;
  Degats: number;
  Nom: string;
  Temporalite: string;
  constructor(Nom: string = "", Temporalite: string = "", Attaque: number = 0, Degats: number = 0, Critique: string = "") {
    this.Nom = Nom;
    this.Temporalite = Temporalite;
    this.Attaque = Attaque;
    this.Degats = Degats;
    this.Critique = Critique;
  }
}

export class Caracteristique {
  Nom: string;
  Modif: number;
  Natif: number;
  Score: number;
  constructor(Nom: string = "", Natif: number = 0, Modif: number = 0, Score: number = 0) {
    this.Nom = Nom;
    this.Natif = Natif;
    this.Modif = Modif;
    this.Score = Score;
  }
}


export class Caracteristiques {
  CHA: Caracteristique;
  CON: Caracteristique;
  DEX: Caracteristique;
  FOR: Caracteristique;
  INT: Caracteristique;
  SAG: Caracteristique;
  constructor(CHA: Caracteristique, CON: Caracteristique, DEX: Caracteristique, FOR: Caracteristique, INT: Caracteristique, SAG: Caracteristique) {
    this.CHA = CHA;
    this.CON = CON;
    this.DEX = DEX;
    this.FOR = FOR;
    this.INT = INT;
    this.SAG = SAG;
  }
}

export class Competence {
  Nom: string;
  Base: string;
  Modif: number;
  Natif: number;
  constructor(Nom: string = "", Base: string = "", Modif: number = 0, Score: number = 0) {
    this.Nom = Nom;
    this.Natif = Modif;
    this.Modif = Modif;
    this.Base = Base;
  }
}

export class Defense {
  CA: number;
  ModDex: number;
  Nom: string;
  Temporalite: string;
  LimEsquive: number;
  constructor(Nom: string = "", Temporalite: string = "", CA: number = 0, ModDex: number = 0, LimEsquive: number = 0) {
    this.Nom = Nom;
    this.Temporalite = Temporalite;
    this.CA = CA;
    this.ModDex = ModDex;
    this.LimEsquive = LimEsquive;
  }
}

export class Etat {
  Concentration: number;
  OverConcentration: number;
  Fatigue: number;
  OverFatigue: number;
  Mental: number;
  OverMental: number;
  Vie: number;
  OverVie: number;
  constructor(Vie: number = 0, Mental: number = 0, Fatigue: number = 0, Concentration: number = 0) {
    this.Vie = Vie;
    this.Mental = Mental;
    this.Fatigue = Fatigue;
    this.Concentration = Concentration;
  }
}

export class Inventaire {
  Nom: string;
  Temporalite: string;
  constructor(Nom: string = "", Temporalite: string = "") {
    this.Nom = Nom;
    this.Temporalite = Temporalite;
  }
}


export class Champ {
  Nom: string;
  Valeur: number;
  constructor(Nom: string = "", Valeur: number = 0) {
    this.Nom = Nom;
    this.Valeur = Valeur;
  }
}

export class Character {
  Adrenaline: number;
  Age: number;
  Aptitudes: Aptitude[];
  Attaque: Attaque[];
  Badges: string[];
  Caracteristiques: Caracteristiques;
  Cheveux: string;
  Competences: Competence[];
  Defense: Defense[];
  Dextrie: string;
  Etat: Etat;
  Experience: number = 0;
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

