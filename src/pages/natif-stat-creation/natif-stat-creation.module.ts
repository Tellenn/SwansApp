import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NatifStatCreationPage } from './natif-stat-creation';

@NgModule({
  declarations: [
    NatifStatCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(NatifStatCreationPage),
  ],
})
export class NatifStatCreationPageModule {}
