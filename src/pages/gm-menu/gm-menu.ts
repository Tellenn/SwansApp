import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, ModalController } from 'ionic-angular';
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
  chosen: boolean[];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, menuctrl: MenuController, public afDatabase: AngularFireDatabase) {
    let oldFilter: boolean = true;
    if (!this.chosen) {
      this.chosen = new Array<boolean>();
      oldFilter = false;
    }
    console.log(oldFilter);
    menuctrl.enable(false);
    HeaderComponent.toGM = false;
    this.characters = new Array<string>();
    this.sub = afDatabase.list('/Character/').snapshotChanges().subscribe(action => {
      this.names = new Array<string>();
      for (let i = 0; i < action.length; i++) {
        if (!oldFilter)
          this.chosen.push(true);
        this.characters.push(<string>action[i].key);
        let char = <Character>action[i].payload.val()
        this.names.push(char.Nom);
      }
      this.unsub();
    });
  }
  unsub() {
    if (this.sub)
      this.sub.unsubscribe();
    this.sub = null;
  }

  selectPlayer() {
    let modal = this.modalCtrl.create(ModalFilterComponent, { chosen:this.chosen , names : this.names });
    modal.onDidDismiss(val =>{
      if(val.length > 0){
        this.chosen = val;
      }
    });
    modal.present();
  }

  toChar(char: string) {
    HeaderComponent.toGM = true;
    this.navCtrl.setRoot(HomePage, { charnb: char, hideexp: "false"});
  }

  ionViewDidLeave() {
    if(this.sub)
      this.sub.unsubscribe();
    this.sub = null;
  }
}
