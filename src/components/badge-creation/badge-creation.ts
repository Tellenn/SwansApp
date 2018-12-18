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
  candelete: boolean;
  selectedTheme: String;

  editvalues: line[];

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase, public alertCtrl: AlertController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.path = params.get('path');
    this.candelete = params.get('delete');
    this.editvalues = params.get('params');
  }

  validate() {
    let newExp = +HomePage.exp + +this.editvalues[1].val;
    this.afDatabase.object(this.path).update(this.editvalues[0].val);
    this.afDatabase.object('/Character/' + HomePage.charnb + ' / Etat').update(newExp);
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  delete() {
    let confirm = this.alertCtrl.create({
      title: "Supprimer ?",
      message: "Êtes vous sûrs ?",
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: "Confirmer",
          handler: () => {
            this.afDatabase.object(this.path).remove();
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
}
