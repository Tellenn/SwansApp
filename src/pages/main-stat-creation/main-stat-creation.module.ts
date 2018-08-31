import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainStatCreationPage } from './main-stat-creation';

@NgModule({
  declarations: [
    MainStatCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(MainStatCreationPage),
  ],
})
export class MainStatCreationPageModule {}
