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
  music2: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio) {
    nativeAudio.preloadSimple('rick', 'assets/song/nevergonna.mp3');
    nativeAudio.preloadSimple('guile', 'assets/song/shittyguile.mp3');

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
  playmusic2() {
    if (this.music2) {
      //play
      this.nativeAudio.loop("guile");
    } else {
      //stop
      this.nativeAudio.stop("guile");

    }
  }

  



}
