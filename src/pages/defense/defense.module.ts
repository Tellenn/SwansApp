import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefensePage } from './defense';

@NgModule({
  declarations: [
    DefensePage,
  ],
  imports: [
    IonicPageModule.forChild(DefensePage),
  ],
})
export class DefensePageModule {}
