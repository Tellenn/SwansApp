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
  musicguile: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio) {
    this.nativeAudio.preloadSimple('guile', 'assets/song/shittyguile.mp3');
    this.nativeAudio.preloadSimple('rick', 'assets/song/nevergonna.mp3');
  }

  playmusic() {
    if (this.music)
    {
      this.nativeAudio.loop("rick");
    }
    else
    {
      this.nativeAudio.stop("rick");
    }
  }
  playmusicguile() {
    if (this.musicguile)
    {
      this.nativeAudio.loop("guile");
    }
    else
    {
      this.nativeAudio.stop("guile");
    }
  }

  



}
