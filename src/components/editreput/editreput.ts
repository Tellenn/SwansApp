import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditreputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editreput',
  templateUrl: 'editreput.html'
})
export class EditreputComponent {
  newname: string;
  neworigin: string;
  path: string;
  name: string;
  origin: string;
  view: ViewController;
  db: AngularFireDatabase;

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase) {
    this.db = afDatabase;
    this.view = viewCtrl;
    this.path = params.get('path');
    this.name = params.get('name');
    this.origin = params.get('origin');
  }

  validate() {
    console.log(this.path);
    this.db.object(this.path).update({ Nom: this.newname, Valeur: this.neworigin });
    this.view.dismiss();
  }

  cancel() {
    this.view.dismiss();
  }

}
