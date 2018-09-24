import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GmMenuPage } from './gm-menu';

@NgModule({
  declarations: [
    GmMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(GmMenuPage),
  ],
})
export class GmMenuPageModule {}
