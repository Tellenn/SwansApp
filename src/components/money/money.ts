import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/internal/Observable';
import { EditNumberModalComponent } from '../edit-number-modal/edit-number-modal';

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyComponent {
  ans: Observable<any[]>;
  text: string;
  moneys: Champ[];

  constructor(public afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {
    this.ans = this.afDatabase.list('/Character/' + HomePage.charnb + '/Monnaie').snapshotChanges();
    this.ans.subscribe(action => {
      this.moneys = new Array<Champ>();
      for (let i = 0; i < action.length; i++)
        this.moneys.push(action[i].payload.val());
    });
  }

  editMoney(i: number) {
    this.modalCtrl.create(EditNumberModalComponent, {val: this.moneys[i].Valeur, name: this.moneys[i].Nom, path: "/Character/" + HomePage.charnb + "/Monnaie/" + i}).present();
  }

  createMonnaie() {
    this.modalCtrl.create(EditNumberModalComponent, { path: "/Character/" + HomePage.charnb + "/Monnaie/" + this.moneys.length }).present();
  }
}
export interface Champ {
  Nom: string;
  Valeur: number;
}
