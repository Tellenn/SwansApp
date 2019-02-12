import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage, Character } from '../home/home';
import { WelcomeCreationPage } from '../welcome-creation/welcome-creation';
import { GmMenuPage } from '../gm-menu/gm-menu';
import { HeaderComponent } from '../../components/header/header';

@IonicPage()
@Component({
  selector: 'page-charchoice',
  templateUrl: 'charchoice.html',
})
export class CharchoicePage {

  selectedTheme: String;
  sub: any;
  dico: number[];
  names: string[];
  perso: Character;
  charnb: number;

  constructor(menuctrl : MenuController,public afDatabase: AngularFireDatabase, public navCtrl: NavController) {
    menuctrl.enable(false);
    HeaderComponent.toGM = false;
    this.sub = afDatabase.list('/Character').snapshotChanges().subscribe(action => {
      this.dico = new Array<number>();
      this.names = new Array<string>();
      for (let i = 0; i < action.length; i++) {
        let perso: Character = <Character>action[i].payload.val();
        this.names.push(perso.Nom);
        this.dico.push(+action[i].key);
      }
    });
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

  validate() {
    if (this.charnb >= 0) {
      this.navCtrl.setRoot(HomePage, { charnb: this.dico[this.charnb], hideexp: "true"});
    }
  }
  newchar() {
    this.navCtrl.setRoot(WelcomeCreationPage, {});
  }
  togm() {
    this.navCtrl.setRoot(GmMenuPage, {});
  }
}
