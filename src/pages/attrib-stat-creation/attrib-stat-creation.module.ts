import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttribStatCreationPage } from './attrib-stat-creation';

@NgModule({
  declarations: [
    AttribStatCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(AttribStatCreationPage),
  ],
})
export class AttribStatCreationPageModule {}
