import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-parametres',
  templateUrl: 'parametres.html',
})
export class ParametresPage {

  selectedTheme: String;
  music: boolean;
  musicguile: boolean;
  night: boolean;
  color: string;

  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.nativeAudio.preloadSimple('guile', 'assets/song/shitty.mp3');
    this.nativeAudio.preloadSimple('rick', 'assets/song/nevergonna.mp3');
    this.storage.get("theme").then(val => {
      if(val == 'dark-theme')
        this.night = true;
    });
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
  nightmode() {
    if (!this.night) {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }

  }

  setColor(thing) {
    //Open modal
    console.log(thing);
  }


}
