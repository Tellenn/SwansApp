import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../../pages/home/home';
import { Observable } from 'rxjs';
import { EditComponent,line } from '../edit/edit';
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
  maxindex:number;
  dico:number[];

  constructor(public afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {
    this.ans = this.afDatabase.list('/Character/' + HomePage.charnb + '/Reputation').snapshotChanges();
    this.ans.subscribe(action => {
      this.dico = new Array<number>();
      this.reputations = new Array<Reputation>();
      for (let i = 0; i < action.length; i++){
        this.reputations.push(action[i].payload.val());
        if(+action[i].key> this.maxindex){
          this.maxindex = +action[i].key;
        }
        this.dico[i]= +action[i].key;
      }
      this.maxindex++;
    });
  }

  createRep() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Réputation", "", "Valeur"));
    this.modalCtrl.create(EditComponent, {delete: false,params: params, path: "/Character/" + HomePage.charnb + "/Reputation/" + this.maxindex }).present();
  }

  edit(i: number) {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", this.reputations[i].Nom, "Nom"));
    params.push(new line("Réputation", this.reputations[i].Valeur, "Valeur"));
    this.modalCtrl.create(EditComponent, { delete: true, params: params, path: "/Character/" + HomePage.charnb + "/Reputation/" + this.dico[i] }).present();
  }


}

export interface Reputation {
  Nom: string;
  Valeur: number;
}
