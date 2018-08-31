import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiceCreationPage } from './dice-creation';

@NgModule({
  declarations: [
    DiceCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(DiceCreationPage),
  ],
})
export class DiceCreationPageModule {}
