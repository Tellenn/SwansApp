import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
})
export class InventairePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

}
