import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage, Character } from '../home/home';
import { line } from '../../components/edit/edit';
import { BadgeCreationComponent } from '../../components/badge-creation/badge-creation';

@IonicPage()
@Component({
  selector: 'page-badges',
  templateUrl: 'badges.html',
})
export class BadgesPage {
  fromgm: boolean;
  badges: string[];

  sub: any;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase, public navParams: NavParams, public modalCtrl: ModalController) {
    this.fromgm = HomePage.fromGM;
    this.sub = afDatabase.object('/Character/' + HomePage.charnb).snapshotChanges().subscribe(action => {
      let char: Character = <Character>action.payload.val();
      this.badges = char.Badges;
    })
    console.log(this.fromgm);
    
  }

  redeemExp() {

  }

  addBadge() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Bonus exp", 0, "Temporalite"));
    this.modalCtrl.create(BadgeCreationComponent, { delete: true, params: params, path: "/Character/" + HomePage.charnb + "/Badges/" + this.badges.length }).present();
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

}
