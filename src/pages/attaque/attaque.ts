import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditComponent, line } from '../../components/edit/edit';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage, Attaque } from '../home/home';
import { ModalFilterComponent } from '../../components/modal-filter/modal-filter';

/**
 * Generated class for the AttaquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attaque',
  templateUrl: 'attaque.html',
})
export class AttaquePage {
  sub: any;
  dico:number[];
  attacks:Attaque[];
  maxindex:number;
  names:string[];
  static chosen: boolean[] = new Array<boolean>();

  constructor(public afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {
    this.modalCtrl = modalCtrl;
    this.maxindex = -1;
    this.names = new Array<string>();
    this.sub = afDatabase.list('/Character/'+HomePage.charnb+'/Attaque').snapshotChanges().subscribe( action => {
      this.dico = new Array<number>();
      this.attacks = new Array<Attaque>();
      for( let i = 0 ; i < action.length ; i++ ){
        this.attacks.push(<Attaque>action[i].payload.val());
        let doublon = false;
        for (let j = 0; j < this.names.length && !doublon; j++) {
          if (this.attacks[i].Temporalite == this.names[j]) {
            doublon = true;
          }
        }
        if (!doublon) {
          this.names.push(this.attacks[i].Temporalite);
          AttaquePage.chosen.push(true);
        }
        if(+action[i].key> this.maxindex){
          this.maxindex = +action[i].key;
        }
        this.dico[i]= +action[i].key;
      }
      this.maxindex++;
    });
  }
  
  remove(i:number){
    this.afDatabase.object('/Character/'+HomePage.charnb+'/Attaque/'+this.dico[i]).remove();
  }

  filter() {
    let modal = this.modalCtrl.create(ModalFilterComponent, { chosen: AttaquePage.chosen, names: this.names });
    modal.onDidDismiss(val => {
      if (val.length > 0) {
        AttaquePage.chosen = val;
      }
    });
    modal.present();
  }

  create() {
    let params: line[] = new Array<line>();
    params.push( new line("Nom","","Nom"));
    params.push( new line("Temporalite", "", "Temporalite"));
    params.push( new line("Attaque", "", "Attaque"));
    params.push( new line("Degats", "", "Degats"));
    params.push( new line("Critique", "", "Critique"));
    
    this.modalCtrl.create(EditComponent, {delete :false, params:params, path: "/Character/" + HomePage.charnb + "/Attaque/"+this.maxindex}).present();
  }

  getChosen() {
    return AttaquePage.chosen;
  }

  edit(i: number) {
    let params: line[] = new Array<line>();
    params.push( new line("Nom", this.attacks[i].Nom, "Nom"));
    params.push( new line("Temporalite", this.attacks[i].Temporalite, "Temporalite"));
    params.push( new line("Attaque", this.attacks[i].Attaque, "Attaque"));
    params.push( new line("Degats", this.attacks[i].Degats, "Degats"));
    params.push( new line("Critique", this.attacks[i].Critique, "Critique"));
    this.modalCtrl.create(EditComponent, { delete: true, params: params,path: "/Character/" + HomePage.charnb + "/Attaque/" + this.dico[i]}).present();
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
}
