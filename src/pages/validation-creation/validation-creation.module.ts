import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidationCreationPage } from './validation-creation';

@NgModule({
  declarations: [
    ValidationCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidationCreationPage),
  ],
})
export class ValidationCreationPageModule {}
