import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NamingCreationPage } from './naming-creation';

@NgModule({
  declarations: [
    NamingCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(NamingCreationPage),
  ],
})
export class NamingCreationPageModule {}
