import { Component } from '@angular/core';
import { Character } from '../../pages/home/home';
import { GmMenuPage } from '../../pages/gm-menu/gm-menu';
import { ViewController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'modal-filter',
  templateUrl: 'modal-filter.html'
})
export class ModalFilterComponent {

  names: string[];
  newChoice: boolean[];
  selectedTheme: String;

  constructor(public viewCtrl: ViewController, params: NavParams, private settings:SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    let chosen = params.get("chosen");
    this.names = params.get("names");
    this.newChoice = new Array<boolean>();
    for (let i = 0; i < this.names.length; i++) {
      this.newChoice.push(chosen[i]);
    }
  }

  validate() {
    this.viewCtrl.dismiss(this.newChoice);
  }

  cancel() {
    this.viewCtrl.dismiss([]);
  }

}
