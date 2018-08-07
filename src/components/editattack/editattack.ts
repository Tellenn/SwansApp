import { Component } from '@angular/core';
import { NavParams, ViewController } from '../../../node_modules/ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

/**
 * Generated class for the EditattackComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editattack',
  templateUrl: 'editattack.html'
})
export class EditattackComponent {
  path: string;
  name: string;
  att: number;
  dgt: number;
  crit: string;
  temp: string;
  create:boolean;

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase) {
    this.path = params.get('path');
    this.name = params.get('name');
    this.att = params.get('attaque');
    this.dgt = params.get('degat');
    this.temp = params.get('temporalite');
    this.crit = params.get('critique');
    this.create = params.get('create');
  }

  validate() {
    console.log(this.create);
    if(this.create){
      this.afDatabase.object(this.path).set({Nom: this.name, Attaque: this.att, Degats:this.dgt ,Temporalite: this.temp, Critique: this.crit});
    }else{
      this.afDatabase.object(this.path).update({Nom: this.name, Attaque: this.att, Degats:this.dgt ,Temporalite: this.temp, Critique: this.crit});
    }
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}