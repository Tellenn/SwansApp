import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { ProgressbarComponent } from '../../components/progressbar/progressbar';

@NgModule({
  declarations: [
    HomePage,
    
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ProgressbarComponent
  ]
})
export class HomePageModule {}
