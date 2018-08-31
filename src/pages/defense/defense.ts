import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ResistanceComponent } from '../../components/resistance/resistance';
import { HomePage, Defense,Caracteristique } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditComponent,line } from '../../components/edit/edit';
import { CalculatorProvider } from '../../providers/character/character';

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
  sub: any;
  dico: number[];
  modal: ModalController;
  defenses: Defense[];
  maxindex: number;
  basedef: number;

  constructor(public afDatabase: AngularFireDatabase, modalCtrl: ModalController, calculator: CalculatorProvider) {
    this.sub = new Array<any>();
    this.modal = modalCtrl;
    this.maxindex = -1;
    this.sub.push(afDatabase.object('/Character/' + HomePage.charnb + '/Caracteristiques/CON').snapshotChanges().subscribe(action => {
      this.basedef = 10 + calculator.calcmodif(<Caracteristique>action.payload.val());
    }));
    this.sub.push(afDatabase.list('/Character/' + HomePage.charnb + '/Defense').snapshotChanges().subscribe(action => {
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
    }));
  }
  ionViewDidLeave() {
    for (let i = 0; i < this.sub.length; i++) {
      this.sub[i].unsubscribe();
    }
  }

  remove(i: number) {
    this.afDatabase.object('/Character/' + HomePage.charnb + '/Defense/' + this.dico[i]).remove();
  }

  create() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Temporalite", "", "Temporalite"));
    params.push(new line("CA", "", "CA"));
    params.push(new line("ModDex", "", "ModDex"));

    this.modal.create(EditComponent, { delete: false, params:params, path: "/Character/" + HomePage.charnb + "/Defense/" + this.maxindex }).present();
  }

  edit(i: number) {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", this.defenses[i].Nom, "Nom"));
    params.push(new line("Temporalite", this.defenses[i].Temporalite, "Temporalite"));
    params.push(new line("CA", this.defenses[i].CA, "CA"));
    params.push(new line("ModDex", this.defenses[i].CA, "ModDex"));
    this.modal.create(EditComponent, { delete: true, params: params, path: "/Character/" + HomePage.charnb + "/Defense/" + this.dico[i] }).present();

  }
}
