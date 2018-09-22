import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character, Caracteristiques, Competence } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { MainStatCreationPage } from '../main-stat-creation/main-stat-creation';

/**
 * Generated class for the NatifCompCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-natif-comp-creation',
  templateUrl: 'natif-comp-creation.html',
})
export class NatifCompCreationPage {
  character: Character;
  stats: Competence[];
  sub: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    this.character = navParams.get("character");
    this.sub = afDatabase.list('/Character/0/Competences').snapshotChanges().subscribe(action => {
      this.stats = new Array<Competence>();
      for (let i = 0; i < action.length; i++) {
        this.stats.push(<Competence>action[i].payload.val());
        this.stats[i].Modif = 0;
        this.stats[i].Natif = 0;
      }
      this.character.Competences = this.stats;
    });
  }

  ionViewDidLeave() {
      this.sub.unsubscribe();
    }

  next() {
    for (let i = 0; i < this.character.Competences.length; i++) {
      this.character.Competences[i].Natif = +this.character.Competences[i].Natif;
    }
    this.navCtrl.push(MainStatCreationPage, { character: this.character });
  }

}
