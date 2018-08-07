import { Component } from '@angular/core';
import { ViewController, NavParams } from '../../../node_modules/ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Component({
  selector: 'editspell',
  templateUrl: 'editspell.html'
})
export class EditspellComponent {
  path: string;
  pal: number;
  name: string;
  lifc: number;
  con: number;
  create:boolean;

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase) {
    this.path = params.get('path');
    this.name = params.get('name');
    this.pal = params.get('pal');
    this.lifc = params.get('lifc');
    this.con = params.get('con');
    this.create = params.get('create');
  }

  validate() {
    console.log(this.create);
    if(this.create){
      this.afDatabase.object(this.path).set({Nom: this.name, Palier: this.pal, LifeCondition:this.lifc ,Concentration: this.con});
    }else{
      this.afDatabase.object(this.path).update({Nom: this.name, Palier: this.pal, LifeCondition:this.lifc ,Concentration: this.con});
    }
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
