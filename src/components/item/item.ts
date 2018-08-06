import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EdititemComponent } from '../edititem/edititem';
import { AngularFireDatabase } from 'angularfire2/database';
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
  @Input() item: any;
  @Input() iditem: number
  modal: ModalController;

  constructor(public modalCtrl: ModalController, public afDatabase: AngularFireDatabase) {
    console.log(this.item);
    this.modal = modalCtrl;
  }

  edit() {
    console.log("Editing item");
    this.modal.create(EdititemComponent, { name: this.item.Nom, origin: this.item.Temporalite, path: "/Character/" + HomePage.charnb + "/Inventaire/" + this.iditem }).present();
  }

  delete() {
    this.afDatabase.object("/Character/" + HomePage.charnb + "/Inventaire/" + this.iditem).remove();
  }

}
