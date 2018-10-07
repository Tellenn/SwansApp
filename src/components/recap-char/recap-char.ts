import { Component, Input } from '@angular/core';
import { Character, HomePage, Caracteristiques, Caracteristique, Etat } from '../../pages/home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { CalculatorProvider } from '../../providers/character/character';

@Component({
  selector: 'recap-char',
  templateUrl: 'recap-char.html'
})

export class RecapCharComponent {
  @Input('character') charno: string;

  character: Character;

  lifecolor: string;
  mentalcolor: string;
  fatiguecolor: string;
  concentrationcolor: string;

  maxLife: number;
  maxMental: number;
  maxConcentration: number;
  maxFatigue: number;

  percentLife: number;
  percentMental: number;
  percentFatigue: number;
  percentConcentration: number;

  calc: CalculatorProvider;


  constructor(public calculator: CalculatorProvider, public afDatabase: AngularFireDatabase) {
    
    this.calc = calculator;

    this.lifecolor = "darkred";
    this.mentalcolor = "darkgreen";
    this.fatiguecolor = "darkorange";
    this.concentrationcolor = "teal";

    setTimeout(() => {

      this.afDatabase.object('/Character/' + this.charno).snapshotChanges().subscribe(action => {
        this.character = <Character>action.payload.val();

        console.log(this.character);

        this.character.Caracteristiques.CON.Natif += this.character.Niveau - 1;

        this.maxLife = calculator.calcmodif(this.character.Caracteristiques.CON) + 8;
        this.percentLife = this.character.Etat.Vie / this.maxLife * 100;

        this.maxMental = calculator.calcmodif(this.character.Caracteristiques.CON) * 2 + 20;
        this.percentMental = this.character.Etat.Mental / this.maxMental * 100;

        this.maxFatigue = 10;
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
        this.percentConcentration = this.character.Etat.Concentration / this.maxConcentration * 100;
      });
    },1500);
  }


}
