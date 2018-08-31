import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeCreationPage } from './welcome-creation';

@NgModule({
  declarations: [
    WelcomeCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeCreationPage),
  ],
})
export class WelcomeCreationPageModule {}
