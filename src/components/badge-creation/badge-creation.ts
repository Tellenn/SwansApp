import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { SettingsProvider } from '../../providers/settings/settings';
import { line } from '../edit/edit';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'badge-creation',
  templateUrl: 'badge-creation.html'
})
export class BadgeCreationComponent {
  path: string;
  selectedTheme: String;

  editvalues: line[];

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase, public alertCtrl: AlertController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.path = params.get('path');
    this.editvalues = params.get('params');
  }

  validate() {
    let newExp : number;
    if(!+HomePage.exp){
      newExp = +this.editvalues[1].val;
    }else{
      newExp = +HomePage.exp + +this.editvalues[1].val;
    }
    let pathSplitted = this.path.split("/");
    let badge = {};
    badge[pathSplitted[4]] = this.editvalues[0].val;
    this.afDatabase.object("/"+pathSplitted[1]+"/"+pathSplitted[2]+"/"+pathSplitted[3]).update(<JSON>badge);
    let exp = {}
    exp["Experience"] = newExp;
    this.afDatabase.object('/Character/' + HomePage.charnb).update(<JSON>exp);
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
