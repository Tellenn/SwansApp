import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DiceCreationPage } from '../dice-creation/dice-creation';
import { Character } from '../home/home'


@IonicPage()
@Component({
  selector: 'page-naming-creation',
  templateUrl: 'naming-creation.html',
})
export class NamingCreationPage {
  Joueur: string;
  Nom: string;
  Age: number;
  Sexe: string;
  Yeux: string;
  Cheveux: string;
  Taille: string;
  Dextrie: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  next() {
    let perso: Character = new Character();
    let warning: boolean = false;
    if (this.Joueur == null) { warning = true;}
    perso.Joueur = this.Joueur;
    if (this.Nom == null) { warning = true; }
    perso.Nom = this.Nom;
    if (this.Age == null) { warning = true; }
    perso.Age = this.Age;
    if (this.Sexe == null) { warning = true; }
    perso.Sexe = this.Sexe;
    if (this.Yeux == null) { warning = true; }
    perso.Yeux = this.Yeux;
    if (this.Cheveux == null) { warning = true; }
    perso.Cheveux = this.Cheveux;
    if (this.Taille == null) { warning = true; }
    perso.Taille = this.Taille;
    if (this.Dextrie == null) { warning = true; }
    perso.Dextrie = this.Dextrie;
    console.log(perso);
    if (warning) {
      let confirm = this.alertCtrl.create({
        title: "Ôla !",
        message: "Certains éléments sont vides, vous êtes sûr de continuer ?",
        buttons: [
          {
            text: 'Retour'
          },
          {
            text: "Valider",
            handler: () => {
              this.navCtrl.push(DiceCreationPage, { perso: perso });
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.navCtrl.push(DiceCreationPage, { perso: perso });
    }
  }

}
