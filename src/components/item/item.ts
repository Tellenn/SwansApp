import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EdititemComponent } from '../edititem/edititem';
import { AngularFireDatabase } from 'angularfire2/database';

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
  @Input() item: any;
  @Input() character: number;
  @Input() iditem: number
  modal: ModalController;

  constructor(public modalCtrl: ModalController, public afDatabase: AngularFireDatabase) {
    console.log(this.item);
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
    this.modal.create(EdititemComponent, { name: this.item.Nom, origin: this.item.Temporalite, path: "/Character/" + this.character + "/Inventaire/" + this.iditem }).present();
  }

  delete() {
    this.afDatabase.object("/Character/" + this.character + "/Inventaire/" + this.iditem).remove();
  }

}
