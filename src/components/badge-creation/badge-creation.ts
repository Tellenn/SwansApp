import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, Events } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { SettingsProvider } from '../../providers/settings/settings';
import { line } from '../edit/edit';
import { HomePage } from '../../pages/home/home';
import { Character } from '../../providers/character/character';

@Component({
  selector: 'badge-creation',
  templateUrl: 'badge-creation.html'
})
export class BadgeCreationComponent {
  path: string;
  charnb: number;
  selectedTheme: String;
  experience: number;

  editvalues: line[];

  constructor(events: Events, params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase, public alertCtrl: AlertController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.path = params.get('path');
    this.charnb = +this.path.split("/")[2];
    this.editvalues = params.get('params');
    events.subscribe(`user:${this.charnb}`, (character: Character) => {
      this.experience = character.Experience;
    });
    
  }

  validate() {
    let newExp : number;
    if (!this.experience){
      newExp = +this.editvalues[1].val;
    }else{
      newExp = +this.experience + +this.editvalues[1].val;
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
