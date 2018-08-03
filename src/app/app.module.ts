import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InventairePage } from '../pages/inventaire/inventaire';
import { EtatPage } from '../pages/etat/etat';
import { AttaquePage } from '../pages/attaque/attaque';
import { CompetencesPage } from '../pages/competences/competences';
import { DefensePage } from '../pages/defense/defense';
import { StatsPage } from '../pages/stats/stats';
import { ParametresPage } from '../pages/parametres/parametres';
import { SortsPage } from '../pages/sorts/sorts';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CharacterProvider } from '../providers/character/character';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InventairePage,
    EtatPage,
    SortsPage,
    CompetencesPage,
    AttaquePage,
    DefensePage,
    ParametresPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InventairePage,
    EtatPage,
    SortsPage,
    CompetencesPage,
    AttaquePage,
    DefensePage,
    ParametresPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CharacterProvider
  ]
})
export class AppModule {}
