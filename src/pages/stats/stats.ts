import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { CharchoicePage } from '../charchoice/charchoice';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
import { CharacterProvider, Caracteristique, Character } from '../../providers/character/character';
import { CharacterCalculatorProvider } from '../../providers/character-calculator/character-calculator';

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  stats: Caracteristique[];
  niv: number;
  character: Character;
  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase, public events: Events,public calc: CharacterCalculatorProvider) {
  }

  ngOnInit() {
    this.events.subscribe(`charUpdate:${HomePage.charnb}`, (character: Character) => {
      this.character = character;
      this.stats = [];
      for (let statName in character.Caracteristiques) {
        this.stats.push(character.Caracteristiques[statName]);
      }
    })
    let charProvider = new CharacterProvider(this.events, HomePage.charnb, this.afDatabase);
  }

  changechar() {
    this.navCtrl.setRoot(CharchoicePage);
  }
  add(stat:Caracteristique){
    let temp = this.afDatabase.list('/Character/' + HomePage.charnb + '/Caracteristiques', ref => ref.orderByChild('Nom').equalTo(stat.Nom));
    temp.set(stat.Nom,{Nom:stat.Nom,Modif:stat.Modif+1,Natif:stat.Natif,Score:stat.Score});
  }

  remove(stat:Caracteristique){
    let temp = this.afDatabase.list('/Character/' + HomePage.charnb + '/Caracteristiques', ref => ref.orderByChild('Nom').equalTo(stat.Nom));
      temp.set(stat.Nom,{Nom:stat.Nom,Modif:stat.Modif-1,Natif:stat.Natif,Score:stat.Score});
  }
}
