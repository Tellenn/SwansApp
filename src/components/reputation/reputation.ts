import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../../pages/home/home';
import { Observable } from 'rxjs';
import { EditComponent,line } from '../edit/edit';
import { ModalController } from 'ionic-angular';
import { Reputation } from '../../providers/character/character';

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
    this.maxindex = 0;
    this.ans = this.afDatabase.list('/Character/' + HomePage.charnb + '/Reputation').snapshotChanges();
    this.ans.subscribe(action => {
      this.dico = new Array<number>();
      this.reputations = new Array<Reputation>();
      for (let i = 0; i < action.length; i++){
        this.reputations.push(action[i].payload.val());
        if(parseInt(action[i].key)> this.maxindex){
          this.maxindex = parseInt(action[i].key);
          console.log(this.maxindex);
        }
        this.dico[i] = parseInt(action[i].key);
      }
      this.maxindex++;
      console.log(this.maxindex);
      console.log(action);
    });
  }

  createRep() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Réputation", "", "Valeur"));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb + "/Reputation/" + this.maxindex }).present();
    console.log(this.maxindex);
  }

  edit(i: number) {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", this.reputations[i].Nom, "Nom"));
    params.push(new line("Réputation", this.reputations[i].Valeur, "Valeur"));
    this.modalCtrl.create(EditComponent, { delete: true, params: params, path: "/Character/" + HomePage.charnb + "/Reputation/" + this.dico[i] }).present();
  }


}
