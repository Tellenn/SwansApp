import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharchoicePage } from '../charchoice/charchoice';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
import { CalculatorProvider } from '../../providers/character/character';
import { Caracteristique } from '../../components/resistance/resistance';

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  calc: CalculatorProvider;
  stats: Caracteristique[];
  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase,calculator: CalculatorProvider) {
    this.calc=calculator;
    this.stats = new Array<Caracteristique>();
    afDatabase.list('/Character/' + HomePage.charnb + '/Caracteristiques').snapshotChanges().subscribe(action => {
      while(this.stats.length!=0){
        this.stats.pop();
      }
      for (let i = 0; i < action.length; i++) {
        this.stats.push(<Caracteristique>action[i].payload.val());
      }
    });
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
