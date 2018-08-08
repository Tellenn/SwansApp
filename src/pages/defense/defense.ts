import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ResistanceComponent } from '../../components/resistance/resistance';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditdefenseComponent } from '../../components/editdefense/editdefense';

/**
 * Generated class for the DefensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-defense',
  templateUrl: 'defense.html',
})
export class DefensePage {
  dico: number[];
  modal: ModalController;
  defenses: Defense[];
  maxindex: number;

  constructor(public afDatabase: AngularFireDatabase, modalCtrl: ModalController) {
    this.modal = modalCtrl;
    this.maxindex = -1;
    afDatabase.list('/Character/' + HomePage.charnb + '/Defense').snapshotChanges().subscribe(action => {
      this.dico = new Array<number>();
      this.defenses = new Array<Defense>();
      for (let i = 0; i < action.length; i++) {
        this.defenses.push(<Defense>action[i].payload.val());
        if (+action[i].key > this.maxindex) {
          this.maxindex = +action[i].key;
        }
        this.dico[i] = +action[i].key;
      }
      this.maxindex++;
    });
  }

  remove(i: number) {
    this.afDatabase.object('/Character/' + HomePage.charnb + '/Defense/' + this.dico[i]).remove();
  }

  create() {
    this.modal.create(EditdefenseComponent, { create: true, path: "/Character/" + HomePage.charnb + "/Defense/" + this.maxindex }).present();
  }

  edit(i: number) {

    this.modal.create(EditdefenseComponent, { create: false, Nom: this.defenses[i].Nom, CA: this.defenses[i].CA, ModDex: this.defenses[i].ModDex, Temporalite: this.defenses[i].Temporalite, path: "/Character/" + HomePage.charnb + "/Defense/" + this.dico[i] }).present();

  }
}
export interface Defense {
  CA: number;
  ModDex: number;
  Nom: string;
  Temporalite: string;
}
