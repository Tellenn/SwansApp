import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage, Character } from '../home/home';
import { WelcomeCreationPage } from '../welcome-creation/welcome-creation';

@IonicPage()
@Component({
  selector: 'page-charchoice',
  templateUrl: 'charchoice.html',
})
export class CharchoicePage {
  sub: any;
  dico: number[];
  names: string[];
  perso: Character;
  charnb: number;

  constructor(public afDatabase: AngularFireDatabase, public navCtrl: NavController) {
    this.sub = afDatabase.list('/Character').snapshotChanges().subscribe(action => {
      this.dico = new Array<number>();
      this.names = new Array<string>();
      for (let i = 0; i < action.length; i++) {
        let perso: Character = <Character>action[i].payload.val();
        this.names.push(perso.Nom);
        this.dico.push(+action[i].key);
      }
    });
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

  validate() {
    if (this.charnb >= 0) {
      this.navCtrl.setRoot(HomePage, { charnb: this.dico[this.charnb] });
    }
  }
  newchar() {
    this.navCtrl.push(WelcomeCreationPage, {});
  }
}
