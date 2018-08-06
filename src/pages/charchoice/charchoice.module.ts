import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharchoicePage } from './charchoice';

@NgModule({
  declarations: [
    CharchoicePage,
  ],
  imports: [
    IonicPageModule.forChild(CharchoicePage),
  ],
})
export class CharchoicePageModule {}
