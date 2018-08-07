import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
import { EditspellComponent } from '../../components/editspell/editspell';


@IonicPage()
@Component({
  selector: 'page-sorts',
  templateUrl: 'sorts.html',
})

export class SortsPage {
  dico:number[];
  modal:ModalController;
  skills:Aptitude[];
  maxindex:number;

  constructor(public afDatabase: AngularFireDatabase, modalCtrl: ModalController) {
    this.modal = modalCtrl;
    this.maxindex = -1;
    afDatabase.list('/Character/'+HomePage.charnb+'/Aptitudes').snapshotChanges().subscribe( action => {
      this.dico = new Array<number>();
      this.skills = new Array<Aptitude>();
      for( let i = 0 ; i < action.length ; i++ ){
        this.skills.push(<Aptitude>action[i].payload.val());
        if(+action[i].key> this.maxindex){
          this.maxindex = +action[i].key;
        }
        this.dico[i]= +action[i].key;
      }
      this.maxindex++;
    });
  }
  
  remove(i:number){
    this.afDatabase.object('/Character/'+HomePage.charnb+'/Aptitudes/'+this.dico[i]).remove();
  }

  create(){
    this.modal.create(EditspellComponent, {create:true, path: "/Character/" + HomePage.charnb + "/Aptitudes/"+this.maxindex}).present();
  }

  edit(i:number){

    this.modal.create(EditspellComponent, {create:false, name: this.skills[i].Nom, pal: this.skills[i].Palier, lifc:this.skills[i].LifeCondition,con: this.skills[i].Concentration,path: "/Character/" + HomePage.charnb + "/Aptitudes/" + this.dico[i]}).present();

    /* this.path = params.get('path');
    this.name = params.get('name');
    this.pal = params.get('pal');
    this.lifc = params.get('lifc');
    this.con = params.get('con');*/
  }
}
export interface Aptitude {
  Concentration: number;
  LifeCondition: number;
  Nom: string;
  Palier: number;
}