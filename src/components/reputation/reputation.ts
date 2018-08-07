import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../../pages/home/home';
import { Observable } from 'rxjs';
import { EditreputComponent } from '../editreput/editreput';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the ReputationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'reputation',
  templateUrl: 'reputation.html'
})
export class ReputationComponent {
  reputations: Reputation[];
  ans: Observable<any[]>;
  text: string;

  constructor(public afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {
    this.ans = this.afDatabase.list('/Character/' + HomePage.charnb + '/Reputation').snapshotChanges();
    this.ans.subscribe(action => {
      this.reputations = new Array<Reputation>();
      for (let i = 0; i < action.length; i++)
        this.reputations.push(action[i].payload.val());
    });
  }

  createRep() {
    this.modalCtrl.create(EditreputComponent, { path: "/Character/" + HomePage.charnb + "/Reputation/" + this.reputations.length }).present();
  }

  addRep(i: number) {
    let temp = this.afDatabase.list('/Character/' + HomePage.charnb + '/Reputation');
    temp.set(i+"", { Nom: this.reputations[i].Nom, Valeur: this.reputations[i].Valeur + 1 });
  }

  removeRep(i: number) {
    let temp = this.afDatabase.list('/Character/' + HomePage.charnb + '/Reputation');
    temp.set(i + "", { Nom: this.reputations[i].Nom, Valeur: this.reputations[i].Valeur - 1 });
  }

}

export interface Reputation {
  Nom: string;
  Valeur: number;
}
