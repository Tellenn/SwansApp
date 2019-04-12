import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CharacterProvider, Caracteristique } from '../../providers/character/character';
import { HomePage } from '../../pages/home/home';


@Component({
  selector: 'resistance',
  templateUrl: 'resistance.html'
})
export class ResistanceComponent {
  calc: CharacterProvider;
  DEX: Caracteristique;
  CON: Caracteristique;
  SAG: Caracteristique;

  constructor(public afDatabase: AngularFireDatabase, calculator: CharacterProvider) {
    this.calc = calculator;
    afDatabase.list('/Character/' + HomePage.charnb + '/Caracteristiques').snapshotChanges().subscribe(action => {
      let char: Caracteristique;
      for (let i = 0; i < action.length; i++) {
        char = <Caracteristique>action[i].payload.val();
        switch (char.Nom) {
          case "DEX":
            this.DEX = char;
            break;
          case "CON":
            this.CON = char;
            break;
          case "SAG":
            this.SAG = char;
            break;
        }
      }
    });
  }
}

