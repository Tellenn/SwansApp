import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
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
  constructor(menuctrl : MenuController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    menuctrl.enable(false);
  }

  next() {
    let perso: Character = new Character();
    let warning: boolean = false;
    if (this.Joueur == null) { warning = true; perso.Joueur = ""}
    perso.Joueur = this.Joueur;
    if (this.Nom == null) { warning = true; perso.Nom = ""}
    perso.Nom = this.Nom;
    if (this.Age == null) { warning = true; perso.Age = 0}
    perso.Age = this.Age;
    if (this.Sexe == null) { warning = true; perso.Sexe = ""}
    perso.Sexe = this.Sexe;
    if (this.Yeux == null) { warning = true; perso.Yeux = ""}
    perso.Yeux = this.Yeux;
    if (this.Cheveux == null) { warning = true; perso.Cheveux = ""}
    perso.Cheveux = this.Cheveux;
    if (this.Taille == null) { warning = true; perso.Taille = ""}
    perso.Taille = this.Taille;
    if (this.Dextrie == null) { warning = true; perso.Dextrie = ""}
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
