import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/internal/Observable';
import { EditComponent,line } from '../edit/edit';

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyComponent {
  ans: Observable<any[]>;
  text: string;
  moneys: Champ[];
  dico: Array<number>;
  maxIndex: number;

  constructor(public afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {
    this.ans = this.afDatabase.list('/Character/' + HomePage.charnb + '/Monnaie').snapshotChanges();
    this.ans.subscribe(action => {
      this.moneys = new Array<Champ>();
      this.dico = new Array<number>();
      for (let i = 0; i < action.length; i++) {
        this.moneys.push(action[i].payload.val());
        this.dico.push(+action[i].key);
      }
      this.setMaxIndex();
    });
  }

  editMoney(i: number) {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", this.moneys[i].Nom, "Nom"));
    params.push(new line("Quantitée", this.moneys[i].Valeur, "Valeur"));
    this.modalCtrl.create(EditComponent, { delete: true, params: params, path: "/Character/" + HomePage.charnb + "/Monnaie/" + i }).present();
  }

  createMonnaie() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Quantitée", "", "Valeur"));
    this.modalCtrl.create(EditComponent, { delete: false, params:params, path: "/Character/" + HomePage.charnb + "/Monnaie/" + this.maxIndex }).present();
    
  }

  setMaxIndex(): void{
    console.log("dico status");
    console.log(this.dico);
    this.maxIndex = 0;
    for(let i = 0; i < this.dico.length && (this.maxIndex == this.dico[i]); i++){
      this.maxIndex++;
    }
    console.log("MaxIndex : "+this.maxIndex);
  }

  
}
export interface Champ {
  Nom: string;
  Valeur: number;
}
