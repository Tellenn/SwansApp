import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage, Aptitude, Character } from '../home/home';
import { EditComponent,line } from '../../components/edit/edit';
import { CalculatorProvider } from '../../providers/character/character';


@IonicPage()
@Component({
  selector: 'page-sorts',
  templateUrl: 'sorts.html',
})

export class SortsPage {
  dico:number[];
  modal:ModalController;
  skills:Aptitude[];
  maxindex: number;
  maxtalent: number;
  pttalent: number;
  sub: any[];
  niveau: number;

  constructor(public afDatabase: AngularFireDatabase, modalCtrl: ModalController, calculator: CalculatorProvider) {
    this.modal = modalCtrl;
    this.maxindex = -1;
    this.pttalent = 0;
    this.sub = new Array<any>();

    this.sub.push(afDatabase.list('/Character/'+HomePage.charnb+'/Aptitudes').snapshotChanges().subscribe( action => {
      this.dico = new Array<number>();
      this.skills = new Array<Aptitude>();
      if (HomePage.mainstat.Nom == "CON") {
        this.pttalent = calculator.calcmodif(HomePage.mainstat, HomePage.level) + HomePage.level - 1;
      } else {+ HomePage.level - 1

        this.pttalent = calculator.calcmodif(HomePage.mainstat) + HomePage.level - 1;
      }
      for (let i = 0; i < action.length; i++){
        let skill = <Aptitude>action[i].payload.val()
        this.skills.push(skill);
        this.pttalent = this.pttalent - Math.max(0, skill.Palier * 2 - 1);
        console.log(this.pttalent);
        if(+action[i].key> this.maxindex){
          this.maxindex = +action[i].key;
        }
        this.dico[i]= +action[i].key;
      }
      this.maxindex++;
    }));
    
  }

  ionViewDidLeave() {
    for (let i = 0; i < this.sub.length; i++) {
      this.sub[i].unsubscribe();
    }
  }
  

  create() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Concentration", "", "Concentration"));
    params.push(new line("Life Condition", "", "LifeCondition"));
    params.push(new line("Palier", "", "Palier"));
    this.modal.create(EditComponent, {delete:false, params:params, path: "/Character/" + HomePage.charnb + "/Aptitudes/"+this.maxindex}).present();
  }

  edit(i:number){
    let params: line[] = new Array<line>();
    params.push(new line("Nom", this.skills[i].Nom, "Nom"));
    params.push(new line("Concentration", this.skills[i].Concentration, "Concentration"));
    params.push(new line("Life Condition", this.skills[i].LifeCondition, "LifeCondition"));
    params.push(new line("Palier", this.skills[i].Palier, "Palier"));
    this.modal.create(EditComponent, { delete: true, params: params,path: "/Character/" + HomePage.charnb + "/Aptitudes/" + this.dico[i]}).present();
  }
}
