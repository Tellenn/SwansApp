import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the ItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent {

  text: string;
  modal: ModalController;

  constructor(public modalCtrl: ModalController) {
    this.modal = modalCtrl;
  }

  edit() {
    //Todo :
    // - Add a Component that'll be the modal do change the item
    // - Do the Add
    // - Do the Remove
    // - Do the delete
    // - Do the flop
    console.log("Editing item");
    this.modal.create(HomePage).present();
  }

}
