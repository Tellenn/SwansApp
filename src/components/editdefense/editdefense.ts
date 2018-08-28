import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditdefenseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editdefense',
  templateUrl: 'editdefense.html'
})
export class EditdefenseComponent {
  path: string;
  Nom: string;
  CA: number;
  ModDex: number;
  Temporalite: string;
  create: boolean;

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase) {
    this.path = params.get('path');
    this.Nom = params.get('Nom');
    this.CA = params.get('CA');
    this.ModDex = params.get('ModDex');
    this.Temporalite = params.get('Temporalite');
    this.create = params.get('create');
  }

  validate() {
    console.log(this.create);
    if (this.create) {
      this.afDatabase.object(this.path).set({ Nom: this.Nom, CA: this.CA, ModDex: this.ModDex, Temporalite: this.Temporalite});
    } else {
      this.afDatabase.object(this.path).update({ Nom: this.Nom, CA: this.CA, ModDex: this.ModDex, Temporalite: this.Temporalite });
    }
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  delete() {
    this.afDatabase.object(this.path).remove();
    this.viewCtrl.dismiss();
  }
}
