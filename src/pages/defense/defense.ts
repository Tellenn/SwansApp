import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { HomePage, Defense,Caracteristique } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditComponent,line } from '../../components/edit/edit';
import { CharacterProvider } from '../../providers/character/character';
import { ModalFilterComponent } from '../../components/modal-filter/modal-filter';

@IonicPage()
@Component({
  selector: 'page-defense',
  templateUrl: 'defense.html',
})
export class DefensePage {
  sub: any;
  dico: number[];
  defenses: Defense[];
  maxindex: number;
  basedefmag: number;
  baseparade: number = 10;
  baseesquive: number;
  static chosen: boolean[] = new Array<boolean>();
  names: string[];

  constructor(public afDatabase: AngularFireDatabase,public modalCtrl: ModalController, calculator: CharacterProvider) {
    this.sub = new Array<any>();
    this.modalCtrl = modalCtrl;
    this.maxindex = -1;
    this.sub.push(afDatabase.object('/Character/' + HomePage.charnb + '/Caracteristiques/DEX').snapshotChanges().subscribe(action => {
      this.baseesquive = 10 + calculator.calcmodif(<Caracteristique>action.payload.val());
    }));
    this.sub.push(afDatabase.object('/Character/' + HomePage.charnb + '/Caracteristiques/SAG').snapshotChanges().subscribe(action => {
      this.basedefmag = 5 + calculator.calcmodif(<Caracteristique>action.payload.val());
    }));
    this.sub.push(afDatabase.list('/Character/' + HomePage.charnb + '/Defense').snapshotChanges().subscribe(action => {
      this.names = new Array<string>();
      this.dico = new Array<number>();
      this.defenses = new Array<Defense>();
      for (let i = 0; i < action.length; i++) {
        this.defenses.push(<Defense>action[i].payload.val());
        let doublon = false;
        for (let j = 0; j < this.names.length && !doublon; j++) {
          if (this.defenses[i].Temporalite == this.names[j]) {
            doublon = true;
          }
        }
        if (!doublon) {
          this.names.push(this.defenses[i].Temporalite)
          DefensePage.chosen.push(true);
        }
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

  filter() {
    let modal = this.modalCtrl.create(ModalFilterComponent, { chosen: DefensePage.chosen, names: this.names });
    modal.onDidDismiss(val => {
      if (val.length > 0) {
        DefensePage.chosen = val;
      }
    });
    modal.present();
  }

  remove(i: number) {
    this.afDatabase.object('/Character/' + HomePage.charnb + '/Defense/' + this.dico[i]).remove();
  }

  getChosen(){
    return DefensePage.chosen;
  }

  create() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Temporalite", "", "Temporalite"));
    params.push(new line("CA", "", "CA"));
    params.push(new line("ModDex", "", "ModDex"));
    this.modalCtrl.create(EditComponent, { delete: false, params:params, path: "/Character/" + HomePage.charnb + "/Defense/" + this.maxindex }).present();
  }

  edit(i: number) {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", this.defenses[i].Nom, "Nom"));
    params.push(new line("Temporalite", this.defenses[i].Temporalite, "Temporalite"));
    params.push(new line("CA", this.defenses[i].CA, "CA"));
    params.push(new line("ModDex", this.defenses[i].CA, "ModDex"));
    this.modalCtrl.create(EditComponent, { delete: true, params: params, path: "/Character/" + HomePage.charnb + "/Defense/" + this.dico[i] }).present();
  }
}
