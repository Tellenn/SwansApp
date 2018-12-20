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
  nextIndex: number;

  sub: any;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase, public navParams: NavParams, public modalCtrl: ModalController) {
    this.fromgm = HomePage.fromGM;
    this.sub = afDatabase.list('/Character/' + HomePage.charnb+"/Badges").snapshotChanges().subscribe(actions => {
      let listeBadges : string[] = new Array<string>();
      let index : number = 0;
      actions.forEach(function(action){
        listeBadges.push(<string>action.payload.val());
        if(index <= +action.key){
          index = +action.key+1;
        }
      });
      this.badges = listeBadges;
      this.nextIndex = index;
    });
  }

  addBadge() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Bonus exp", 0, "Temporalite"));
    this.modalCtrl.create(BadgeCreationComponent, { delete: true, params: params, path: "/Character/" + HomePage.charnb + "/Badges/" + this.nextIndex }).present();
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

}
