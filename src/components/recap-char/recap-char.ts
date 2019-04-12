import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CharacterProvider, Character } from '../../providers/character/character';
import { CharacterCalculatorProvider } from '../../providers/character-calculator/character-calculator';
import { Events } from 'ionic-angular';

@Component({
  selector: 'recap-char',
  templateUrl: 'recap-char.html'
})

export class RecapCharComponent {
  @Input('character') charno: string;

  charProvider: CharacterProvider;
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

  calc: CharacterProvider;


  constructor(public events: Events, public charCalculator: CharacterCalculatorProvider, public afDatabase: AngularFireDatabase) {


    this.lifecolor = "darkred";
    this.mentalcolor = "darkgreen";
    this.fatiguecolor = "darkorange";
    this.concentrationcolor = "teal";

  }

  ngOnInit() {
    this.events.subscribe(`charUpdate:${this.charno}`, (character: Character) => {
      
      this.character = character;

      this.maxLife = this.charCalculator.getMaxLife(character);
      this.percentLife = character.Etat.Vie / this.maxLife * 100;

      this.maxMental = this.charCalculator.getMaxMentalLife(character);
      this.percentMental = character.Etat.Mental / this.maxMental * 100;

      this.maxFatigue = this.charCalculator.getMaxWeariness(character);
      this.percentFatigue = character.Etat.Fatigue / this.maxFatigue * 100;

      this.maxConcentration = this.charCalculator.getMaxFocus(character);
      this.percentConcentration = character.Etat.Concentration / this.maxConcentration * 100;
    });
    this.charProvider = new CharacterProvider(this.events, +this.charno, this.afDatabase);
  }
    
  
}
