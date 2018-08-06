import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { EdititemComponent } from '../../components/edititem/edititem';


@IonicPage()
@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
})
export class InventairePage {
  character: number;
  items: Observable<any[]>;
  inventaire: Inventaire[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public afDatabase: AngularFireDatabase) {
    this.character = 0;
    this.items = this.afDatabase.list('/Character/0/Inventaire').snapshotChanges();
    this.items.subscribe(action => {
      this.inventaire = new Array<Inventaire>();
      for (let i = 0; i < action.length; i++)
        this.inventaire.push(action[i].payload.val());
    });
  }

  createitem() {
    this.modalCtrl.create(EdititemComponent, { name: "", origin: "", path: "/Character/" + this.character + "/Inventaire/" + this.inventaire.length }).present();
  }

}
export interface Inventaire {
  Nom: string;
  Temporalite: string;
}
