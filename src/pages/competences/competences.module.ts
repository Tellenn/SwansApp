import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompetencesPage } from './competences';

@NgModule({
  declarations: [
    CompetencesPage,
  ],
  imports: [
    IonicPageModule.forChild(CompetencesPage),
  ],
})
export class CompetencesPageModule {}
