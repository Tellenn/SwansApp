import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  age: any;
  chris: Observable<any>;
  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase) {
    this.age = 5;
    this.chris = afDatabase.object('/Character/0').snapshotChanges();
    this.chris.subscribe(action => {
      console.log(action.payload.val());
      let perso = action.payload.val();
      this.age = perso.Age;
    });
  }
}
