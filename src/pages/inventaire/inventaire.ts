import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { EdititemComponent } from '../../components/edititem/edititem';
import { CharchoicePage } from '../charchoice/charchoice';


@IonicPage()
@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
})
export class InventairePage {

  items: Observable<any[]>;
  inventaire: Inventaire[];
  dico:number[];
  maxindex:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public afDatabase: AngularFireDatabase) {
    this.maxindex=-1
    this.items = this.afDatabase.list('/Character/'+HomePage.charnb+'/Inventaire').snapshotChanges();
    this.items.subscribe(action => {
      
      this.dico = new Array<number>();
      this.inventaire = new Array<Inventaire>();
      for (let i = 0; i < action.length; i++){
        this.inventaire.push(action[i].payload.val());
        if(+action[i].key> this.maxindex){
          this.maxindex = +action[i].key;
        }
        this.dico[i]= +action[i].key;
      }
      this.maxindex++;
    });
  }

  createitem() {
    this.modalCtrl.create(EdititemComponent, { name: "", origin: "", path: "/Character/" + HomePage.charnb + "/Inventaire/" + this.maxindex }).present();
  }
  
  changechar(){
    this.navCtrl.setRoot(CharchoicePage);
  }

}
export interface Inventaire {
  Nom: string;
  Temporalite: string;
}
