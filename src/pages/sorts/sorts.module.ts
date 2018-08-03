import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SortsPage } from './sorts';

@NgModule({
  declarations: [
    SortsPage,
  ],
  imports: [
    IonicPageModule.forChild(SortsPage),
  ],
})
export class SortsPageModule {}
