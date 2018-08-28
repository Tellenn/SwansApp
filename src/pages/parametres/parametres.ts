import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the ParametresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parametres',
  templateUrl: 'parametres.html',
})
export class ParametresPage {
  music: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio) {
    nativeAudio.preloadSimple('rick', '../../../resources/nevergonna.mp3');
  }

  playmusic() {
    if (this.music) {
      //play
      this.nativeAudio.loop("rick");
    } else {
      //stop
      this.nativeAudio.stop("rick");

    }
  }

  



}
