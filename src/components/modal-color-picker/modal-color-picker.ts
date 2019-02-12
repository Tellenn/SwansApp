import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'modal-color-picker',
  templateUrl: 'modal-color-picker.html'
})
export class ModalColorPickerComponent {

  color: string;
  selectedTheme: String;

  constructor(public viewCtrl: ViewController, params: NavParams, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  setColor(color: any) {
    this.color = color;
    console.log(color);
  }

  validate() {
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss([]);
  }

}
