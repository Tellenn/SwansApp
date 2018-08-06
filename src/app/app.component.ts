import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { CharchoicePage } from '../pages/charchoice/charchoice';
import { HomePage } from '../pages/home/home';
import { InventairePage } from '../pages/inventaire/inventaire';
import { AttaquePage } from '../pages/attaque/attaque';
import { CompetencesPage } from '../pages/competences/competences';
import { DefensePage } from '../pages/defense/defense';
import { StatsPage } from '../pages/stats/stats';
import { ParametresPage } from '../pages/parametres/parametres';
import { SortsPage } from '../pages/sorts/sorts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CharchoicePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afDatabase: AngularFireDatabase) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Stats', component: StatsPage },
      { title: 'Inventaire', component: InventairePage },
      { title: 'Sorts', component: SortsPage },
      { title: 'Competences', component: CompetencesPage },
      { title: 'Attaque', component: AttaquePage },
      { title: 'Defense', component: DefensePage },
      { title: 'Paramètres', component: ParametresPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
}
