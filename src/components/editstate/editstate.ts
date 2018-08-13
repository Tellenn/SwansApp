import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../../pages/home/home';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditstateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editstate',
  templateUrl: 'editstate.html'
})
export class EditstateComponent {
  path: string;
  val: number;
  name: string;
  max: number;

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase) {
    this.path = params.get('path');
    this.name = params.get('name');
    this.val = params.get('curval');
    this.max = params.get('max');
    if (this.max == null) {
      this.max = 999999999;
    }
  }

  validate() {
    if (this.val < this.max && this.val > 0) {
      let item = {};
      item[this.name] = this.val;
      console.log(item);
      this.afDatabase.object(this.path).update(<JSON>item);
      this.viewCtrl.dismiss();
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
