import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caracteristique, Character } from '../character/character';

@Injectable()
export class CharacterCalculatorProvider {

  constructor() {
    
  }

  calcmodif(carac: Caracteristique, bonus: number = 0) {
    let sum = carac.Natif + carac.Modif + carac.Score + bonus;
    let mod;
    if (sum > 10)
      mod = Math.floor((sum - 10) / 2);
    else
      mod = -Math.ceil((10 - sum) / 2);
    return mod;
  }

  getLevel(char : Character): number {
    return char.Niveau;
  }
  getMaxLife(char: Character): number {
    return this.calcmodif(char.Caracteristiques.CON) + 8;
  }
  getMaxMentalLife(char: Character): number {
    return this.calcmodif(char.Caracteristiques.CON) * 2 + 20;
  }
  getMaxWeariness(char: Character): number {
    return 10;
  }
  getMaxFocus(char: Character) {
    let mainStat: Caracteristique = this.getMainStat(char);
    return (mainStat.Modif + mainStat.Modif + mainStat.Score) * 2;
  }

  getMainStat(char: Character): Caracteristique {
    switch (char.MainStat) {
      case "DEX":
        return char.Caracteristiques.DEX;
      case "CON":
        return char.Caracteristiques.CON;
      case "SAG":
        return char.Caracteristiques.SAG;
      case "INT":
        return char.Caracteristiques.INT;
      case "FOR":
        return char.Caracteristiques.FOR;
      case "CHA":
        return char.Caracteristiques.CHA;
      default:
        throw new Error('MainStat not found');
    }
  }

  getExpToNextLevel(char: Character): number {
    if (char.Niveau == 1) {
      return 500;
    } else {
      return 1000 + 100 * (char.Niveau - 1);
    }
  }

}
