import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ModalController, AlertController } from 'ionic-angular';
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
  dico: Array<number>;
  maxIndex: number;

  constructor(public afDatabase: AngularFireDatabase, public modalCtrl: ModalController, public alertCtrl: AlertController) {
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
    this.modalCtrl.create(EditNumberModalComponent, { val: this.moneys[i].Valeur, name: this.moneys[i].Nom, path: "/Character/" + HomePage.charnb + "/Monnaie/" + i }).present();
  }

  createMonnaie() {
    this.modalCtrl.create(EditNumberModalComponent, { path: "/Character/" + HomePage.charnb + "/Monnaie/" + this.maxIndex }).present();
    //this.setMaxIndex();
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

  deleteMonnaie(i: number) {
    const confirm = this.alertCtrl.create({
      title: "Supprimer la monnaie ?",
      message: "Voulez-vous supprimer la monnaie '" + this.moneys[i].Nom + "' ?",
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: "Confirmer",
          handler: () => {
            console.log("Confirmer sélectionné");
            this.afDatabase.object("/Character/" + HomePage.charnb + "/Monnaie/" + i).remove();
          }
        }
      ]
    });
    confirm.present();
    //this.setMaxIndex();
  }
}
export interface Champ {
  Nom: string;
  Valeur: number;
}
