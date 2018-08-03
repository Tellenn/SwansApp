import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttaquePage } from './attaque';

@NgModule({
  declarations: [
    AttaquePage,
  ],
  imports: [
    IonicPageModule.forChild(AttaquePage),
  ],
})
export class AttaquePageModule {}
