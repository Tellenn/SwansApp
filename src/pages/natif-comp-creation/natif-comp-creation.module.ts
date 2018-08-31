import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NatifCompCreationPage } from './natif-comp-creation';

@NgModule({
  declarations: [
    NatifCompCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(NatifCompCreationPage),
  ],
})
export class NatifCompCreationPageModule {}
