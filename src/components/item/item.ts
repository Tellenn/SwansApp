import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EditComponent, line } from '../edit/edit';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../../pages/home/home';


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
    let params: line[] = new Array<line>();
    params.push(new line("Nom",this.item.Nom,"Nom"));
    params.push(new line("Temporalite", this.item.Temporalite, "Temporalite"));
    this.modal.create(EditComponent, { params: params, delete: true, path: "/Character/" + HomePage.charnb + "/Inventaire/" + this.iditem }).present();
  }
}
