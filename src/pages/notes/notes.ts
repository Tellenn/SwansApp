import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  text: string;

  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('notes' + HomePage.charnb).then(val => { this.text = val; });
  }

  ionViewDidLeave() {
    this.storage.set('notes' + HomePage.charnb, this.text);
    console.log(this.text);
  }
}
