import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InventairePage } from '../pages/inventaire/inventaire';
import { AttaquePage } from '../pages/attaque/attaque';
import { CompetencesPage } from '../pages/competences/competences';
import { DefensePage } from '../pages/defense/defense';
import { StatsPage } from '../pages/stats/stats';
import { ParametresPage } from '../pages/parametres/parametres';
import { SortsPage } from '../pages/sorts/sorts';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CharacterProvider } from '../providers/character/character';

import { LifebarComponent } from '../components/lifebar/lifebar';
import { MentalbarComponent } from '../components/mentalbar/mentalbar';
import { FatiguebarComponent } from '../components/fatiguebar/fatiguebar';
import { ConcentrationbarComponent } from '../components/concentrationbar/concentrationbar';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBMVtckJoshye-NAN1Otb6irvLJX7bFB9I",
  authDomain: "swansapp-bb5ec.firebaseapp.com",
  databaseURL: "https://swansapp-bb5ec.firebaseio.com",
  projectId: "swansapp-bb5ec",
  storageBucket: "swansapp-bb5ec.appspot.com",
  messagingSenderId: "1029373083147"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InventairePage,
    SortsPage,
    CompetencesPage,
    AttaquePage,
    DefensePage,
    ParametresPage,
    LifebarComponent,
    MentalbarComponent,
    FatiguebarComponent,
    ConcentrationbarComponent,
    StatsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InventairePage,
    SortsPage,
    CompetencesPage,
    AttaquePage,
    DefensePage,
    ParametresPage,
    StatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CharacterProvider
  ]
})
export class AppModule {}
