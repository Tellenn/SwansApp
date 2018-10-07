import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { CalculatorProvider } from '../../providers/character/character';
import { HomePage, Competence, Caracteristique,Caracteristiques } from '../home/home';
import { ModalcompComponent } from '../../components/modalcomp/modalcomp';


@IonicPage()
@Component({
  selector: 'page-competences',
  templateUrl: 'competences.html',
})
export class CompetencesPage {
  sub: any;
  stats: Caracteristiques;
  competences: Competence[];
  calc: CalculatorProvider;
  modal: ModalController;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase, calculator: CalculatorProvider, modalCtrl: ModalController) {
    this.sub = new Array<any>();
    this.calc = calculator;
    this.modal = modalCtrl;
    this.competences = new Array<Competence>();
    this.sub.push(afDatabase.object('/Character/' + HomePage.charnb + '/Caracteristiques').snapshotChanges().subscribe(action => {
      this.stats = <Caracteristiques>action.payload.val();
    }));

    this.sub.push(afDatabase.list('/Character/' + HomePage.charnb + '/Competences').snapshotChanges().subscribe(action => {
      this.competences = new Array<Competence>();
      for (let i = 0; i < action.length; i++) {
        this.competences.push(<Competence>action[i].payload.val());
      }
    }));
  }

  getlinkedcar(car: string) {
    switch (car) {
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
  ionViewDidLeave() {
    for (let i = 0; i < this.sub.length; i++) {
      this.sub[i].unsubscribe();
    }
  }

  plus(i: number) {
    this.afDatabase.list('/Character/' + HomePage.charnb + '/Competences').update(i + "", { Nom: this.competences[i].Nom, Base: this.competences[i].Base, Modif: this.competences[i].Modif + 1, Natif: this.competences[i].Natif });
  }

  minus(i: number) {
    this.afDatabase.list('/Character/' + HomePage.charnb + '/Competences').update(i + "", { Nom: this.competences[i].Nom, Base: this.competences[i].Base, Modif: this.competences[i].Modif - 1, Natif: this.competences[i].Natif });
  }
  show(i: number) {
    let val = this.calc.calcmodif(this.getlinkedcar(this.competences[i].Base));
    this.modal.create(ModalcompComponent, { "skill": this.competences[i], "value": val }).present();

  }
}
