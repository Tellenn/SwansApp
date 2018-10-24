import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage, Champ, Inventaire } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { EditComponent, line } from '../../components/edit/edit';
import { CharchoicePage } from '../charchoice/charchoice';
import { ModalFilterComponent } from '../../components/modal-filter/modal-filter';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
})
export class InventairePage {

  sub: any;
  inventaire: Inventaire[];
  names: string[];
  dico: number[];
  maxindex: number;
  static chosen: boolean[] = new Array<boolean>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public afDatabase: AngularFireDatabase, public storage: Storage) {
    this.maxindex = -1;
    this.sub = this.afDatabase.list('/Character/' + HomePage.charnb + '/Inventaire').snapshotChanges().subscribe(action => {
      this.names = new Array<string>();
      this.dico = new Array<number>();
      this.inventaire = new Array<Inventaire>();
      for (let i = 0; i < action.length; i++) {
        this.inventaire.push(<Inventaire>action[i].payload.val());
        let doublon = false;
        for (let j = 0; j < this.names.length && !doublon; j++) {
          if (this.inventaire[i].Temporalite == this.names[j]) {
            doublon = true;
          }
        }
        if (!doublon) {
          this.names.push(this.inventaire[i].Temporalite);
          InventairePage.chosen.push(true);
        }
        if (+action[i].key > this.maxindex) {
          this.maxindex = +action[i].key;
        }
        this.dico[i] = +action[i].key;
      }
      this.maxindex++;
      console.log("Temporalitées : " + this.names);
    });
  }

  filter() {
    let modal = this.modalCtrl.create(ModalFilterComponent, { chosen: InventairePage.chosen, names: this.names });
    modal.onDidDismiss(val => {
      if (val.length > 0) {
        InventairePage.chosen = val;
      }
    });
    modal.present();
  }

  getChosen() {
    return InventairePage.chosen;
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
  createitem() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Temporalite", "", "Temporalite"));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb + "/Inventaire/" + this.maxindex }).present();
  }

}
