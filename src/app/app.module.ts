import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CharchoicePage } from '../pages/charchoice/charchoice';
import { HomePage } from '../pages/home/home';
import { InventairePage } from '../pages/inventaire/inventaire';
import { AttaquePage } from '../pages/attaque/attaque';
import { CompetencesPage } from '../pages/competences/competences';
import { DefensePage } from '../pages/defense/defense';
import { StatsPage } from '../pages/stats/stats';
import { ParametresPage } from '../pages/parametres/parametres';
import { SortsPage } from '../pages/sorts/sorts';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CalculatorProvider } from '../providers/character/character';

import { BarComponent } from '../components/bar/bar';
import { ItemComponent } from '../components/item/item';
import { EditComponent } from '../components/edit/edit';
import { ReputationComponent } from '../components/reputation/reputation';
import { MoneyComponent } from '../components/money/money';
import { HeaderComponent } from '../components/header/header';
import { ResistanceComponent } from '../components/resistance/resistance';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LevelupPage } from '../pages/levelup/levelup';
import { ModalcompComponent } from '../components/modalcomp/modalcomp';
import { NativeAudio } from '@ionic-native/native-audio';


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
    CharchoicePage,
    HomePage,
    InventairePage,
    SortsPage,
    CompetencesPage,
    AttaquePage,
    DefensePage,
    ParametresPage,
    LoginPage,
    LevelupPage,
    BarComponent,
    ItemComponent,
    EditComponent,
    ReputationComponent,
    MoneyComponent,
    HeaderComponent,
    ResistanceComponent,
    StatsPage,
    ModalcompComponent
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
    CharchoicePage,
    InventairePage,
    SortsPage,
    CompetencesPage,
    AttaquePage,
    DefensePage,
    ParametresPage,
    LoginPage,
    LevelupPage,
    EditComponent,
    MoneyComponent,
    HeaderComponent,
    ResistanceComponent,
    ModalcompComponent,
    StatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CalculatorProvider,
    NativeAudio
  ]
})
export class AppModule {}
