import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'edit',
  templateUrl: 'edit.html'
})
export class EditComponent {
  path: string;
  candelete: boolean;

  editvalues: line[];

  constructor(params: NavParams, public viewCtrl: ViewController, public afDatabase: AngularFireDatabase, public alertCtrl: AlertController) {
    this.path = params.get('path');
    this.candelete = params.get('delete');
    this.editvalues = params.get('params');
    console.log(this.editvalues);
  }

  validate() {
    console.log(this.path);
    console.log(this.editvalues);
    let item = {};
    for (let i = 0; i < this.editvalues.length; i++) {
      item[this.editvalues[i].cle] = this.editvalues[i].val;
    }
    console.log(item);
    this.afDatabase.object(this.path).update(<JSON>item);
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  delete() {
    const confirm = this.alertCtrl.create({
      title: "Supprimer ?",
      message: "Êtes vous sûrs ?",
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: "Confirmer",
          handler: () => {
            console.log("Confirmer sélectionné");
            this.afDatabase.object(this.path).remove();
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
}
export class line {

  nom: string;
  val: any;
  cle: string;
  constructor(nom: string = "", val: any = "", cle: string = "") {
    this.nom = nom;
    this.val = val;
    this.cle = cle;
  }
}
