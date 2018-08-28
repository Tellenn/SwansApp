import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditComponent, line } from '../../components/edit/edit';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';

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

  dico:number[];
  modal:ModalController;
  attacks:Attaque[];
  maxindex:number;

  constructor(public afDatabase: AngularFireDatabase, modalCtrl: ModalController) {
    this.modal = modalCtrl;
    this.maxindex = -1;
    afDatabase.list('/Character/'+HomePage.charnb+'/Attaque').snapshotChanges().subscribe( action => {
      this.dico = new Array<number>();
      this.attacks = new Array<Attaque>();
      for( let i = 0 ; i < action.length ; i++ ){
        this.attacks.push(<Attaque>action[i].payload.val());
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

  create() {
    let params: line[] = new Array<line>();
    params.push( new line("Nom","","Nom"));
    params.push( new line("Temporalite", "", "Temporalite"));
    params.push( new line("Attaque", "", "Attaque"));
    params.push( new line("Degats", "", "Degats"));
    params.push( new line("Critique", "", "Critique"));
    
    this.modal.create(EditComponent, {delete :false, params:params, path: "/Character/" + HomePage.charnb + "/Attaque/"+this.maxindex}).present();
  }

  edit(i: number) {
    let params: line[] = new Array<line>();
    params.push( new line("Nom", this.attacks[i].Nom, "Nom"));
    params.push( new line("Temporalite", this.attacks[i].Temporalite, "Temporalite"));
    params.push( new line("Attaque", this.attacks[i].Attaque, "Attaque"));
    params.push( new line("Degats", this.attacks[i].Degats, "Degats"));
    params.push( new line("Critique", this.attacks[i].Critique, "Critique"));
    this.modal.create(EditComponent, { delete: true, params: params,path: "/Character/" + HomePage.charnb + "/Attaque/" + this.dico[i]}).present();
  }
}
export interface Attaque {
  Attaque: number;
  Critique: string;
  Degats: number;
  Nom: string;
  Temporalite: string;
}
