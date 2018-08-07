import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditNumberModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-number-modal',
  templateUrl: 'edit-number-modal.html'
})
export class EditNumberModalComponent {
  path: string;
  val: number;
  name: string;

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase) {
    this.path = params.get('path');
    this.name = params.get('name');
    this.val = params.get('val');
  }

  validate() {
    console.log(this.path);
    this.afDatabase.object(this.path).update({ Nom: this.name, Valeur: this.val });
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
