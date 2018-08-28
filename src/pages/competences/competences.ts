import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { CalculatorProvider } from '../../providers/character/character';
import { HomePage } from '../home/home';
import { ModalcompComponent } from '../../components/modalcomp/modalcomp';

/**
 * Generated class for the CompetencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-competences',
  templateUrl: 'competences.html',
})
export class CompetencesPage {

  stats : Caracteristiques;
  competences :Competence[];
  calc: CalculatorProvider;
  modal: ModalController;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase, calculator: CalculatorProvider, modalCtrl:ModalController) {
    this.calc = calculator;
    this.modal = modalCtrl;
    this.competences = new Array<Competence>();
    afDatabase.object('/Character/'+HomePage.charnb+'/Caracteristiques').snapshotChanges().subscribe(action => {
      this.stats = <Caracteristiques> action.payload.val();
    });

    afDatabase.list('/Character/'+HomePage.charnb+'/Competences').snapshotChanges().subscribe(action => {
      this.competences = new Array<Competence>();
      for(let i = 0 ; i<action.length ; i++){
        this.competences.push(<Competence>action[i].payload.val());
      }
    });
  }

  getlinkedcar(car:string){
    switch(car){
      case "CHA":
        return this.stats.CHA;
      case "DEX":
        return this.stats.DEX;
      case "CON":
        return this.stats.CON;
      case "INT":
        return this.stats.INT;
      case "SAG":
        return this.stats.SAG;
      case "FOR":
        return this.stats.FOR;
    }
  }

  plus(i:number){
    this.afDatabase.list('/Character/'+HomePage.charnb+'/Competences').update(i+"",{Nom: this.competences[i].Nom, Base: this.competences[i].Base, Modif: this.competences[i].Modif+1, Natif: this.competences[i].Natif});
  }

  minus(i:number){
    this.afDatabase.list('/Character/'+HomePage.charnb+'/Competences').update(i+"",{Nom: this.competences[i].Nom, Base: this.competences[i].Base, Modif: this.competences[i].Modif-1, Natif: this.competences[i].Natif});
  }
  show(i: number) {
    let val = this.calc.calcmodif(this.getlinkedcar(this.competences[i].Base));
    this.modal.create(ModalcompComponent, { "skill": this.competences[i], "value": val }).present();
    
  }
}
export interface Competence {
  Nom: string;
  Base: string;
  Modif: number;
  Natif: number;
}

export interface Caracteristique {
  Nom:string;
  Modif: number;
  Natif: number;
  Score: number;
}

export interface Caracteristiques {
  CHA: Caracteristique;
  CON: Caracteristique;
  DEX: Caracteristique;
  FOR: Caracteristique;
  INT: Caracteristique;
  SAG: Caracteristique;
}
