import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Menu, ModalController } from 'ionic-angular';
import { FirebaseDatabase } from 'angularfire2';
import { database } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Character, HomePage } from '../home/home';
import { HeaderComponent } from '../../components/header/header';
import { ModalFilterComponent } from '../../components/modal-filter/modal-filter';


@IonicPage()
@Component({
  selector: 'page-gm-menu',
  templateUrl: 'gm-menu.html',
})
export class GmMenuPage {
  sub: any;
  characters: string[];
  names: string[];
  static chosen: boolean[];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, menuctrl: MenuController, public afDatabase: AngularFireDatabase) {
    let oldFilter: boolean = true;
    this.names = new Array<string>();
    if (!GmMenuPage.chosen) {
      GmMenuPage.chosen = new Array<boolean>();
      oldFilter = false;
    }
    menuctrl.enable(false);
    HeaderComponent.toGM = false;
    this.characters = new Array<string>();
    this.sub = afDatabase.list('/Character/').snapshotChanges().subscribe(action => {
      for (let i = 0; i < action.length; i++) {
        if (!oldFilter)
          GmMenuPage.chosen.push(true);
        this.characters.push(<string>action[i].key);
        let char = <Character>action[i].payload.val()
        this.names.push(char.Nom);
      }
      console.log(this.characters);
    });

    setTimeout(() => {
      if(this.sub)
        this.sub.unsubscribe();
      this.sub = null;
    },5000);
  }

  getChosen() {
    return GmMenuPage.chosen;
  }

  selectPlayer() {
    this.modalCtrl.create(ModalFilterComponent, { characters: this.characters, names : this.names }).present();
  }

  toChar(char: string) {
    HeaderComponent.toGM = true;
    this.navCtrl.setRoot(HomePage, { charnb: char });
  }

  ionViewDidLeave() {
    if(this.sub)
      this.sub.unsubscribe();
    this.sub = null;
  }
}
