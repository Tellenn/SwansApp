import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage, Champ,Inventaire } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { EditComponent, line } from '../../components/edit/edit';
import { CharchoicePage } from '../charchoice/charchoice';


@IonicPage()
@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
})
export class InventairePage {

  sub: any;
  inventaire: Champ[];
  dico: number[];
  maxindex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public afDatabase: AngularFireDatabase) {
    this.maxindex = -1
    this.sub = this.afDatabase.list('/Character/' + HomePage.charnb + '/Inventaire').snapshotChanges().subscribe(action => {

      this.dico = new Array<number>();
      this.inventaire = new Array<Champ>();
      for (let i = 0; i < action.length; i++) {
        this.inventaire.push(<Champ>action[i].payload.val());
        if (+action[i].key > this.maxindex) {
          this.maxindex = +action[i].key;
        }
        this.dico[i] = +action[i].key;
      }
      this.maxindex++;
    });
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
