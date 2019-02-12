import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Character, Defense, Aptitude, Attaque, Etat, Inventaire, Champ, HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-validation-creation',
  templateUrl: 'validation-creation.html',
})
export class ValidationCreationPage {
  sub: any;
  character: Character;

  constructor(menuctrl : MenuController, public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    menuctrl.enable(false);
    this.character = <Character>navParams.get("character");
    this.character.Aptitudes = new Array<Aptitude>();
    this.character.Defense = new Array<Defense>();
    this.character.Attaque = new Array<Attaque>();
    this.character.Etat = new Etat(1, 1, 1, 1);
    this.character.Inventaire = new Array<Inventaire>();
    this.character.Monnaie = new Array<Champ>();
    this.character.Reputation = new Array<Champ>();
    this.character.Niveau = 1;
  }

  next() {
    let maxInd = 0;
    this.sub = this.afDatabase.list("/Character/").snapshotChanges().subscribe(action => {
      if (maxInd == 0) {
        for (let i = 0; i < action.length; i++) {
          console.log(action[i].key);
          if (+action[i].key >= maxInd) {
            maxInd = +action[i].key + 1;
          }
        }
      }
      console.log(maxInd);
      this.afDatabase.object("/Character/" + maxInd).update(this.character);
      this.navCtrl.setRoot(HomePage, { charnb: maxInd });
    });

  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
}
