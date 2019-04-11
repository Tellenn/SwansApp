import { Component } from '@angular/core';
import { IonicPage, ModalController, Events } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
import { EditComponent,line } from '../../components/edit/edit';
import { CharacterProvider, Character, Caracteristique } from '../../providers/character/character';
import { Aptitude } from '../../providers/character/character';
import { CharacterCalculatorProvider } from '../../providers/character-calculator/character-calculator';


@IonicPage()
@Component({
  selector: 'page-sorts',
  templateUrl: 'sorts.html',
})

export class SortsPage {
  dico:number[];
  skills:Aptitude[];
  maxindex: number;
  maxtalent: number;
  pttalent: number;
  sub: any[];
  niveau: number;
  mainstat: Caracteristique;
  charCalculator: CharacterCalculatorProvider;

  constructor(public afDatabase: AngularFireDatabase, public modal: ModalController, public events: Events) {
  }
  ngOnInit() {
    this.charCalculator = new CharacterCalculatorProvider();
    this.maxindex = -1;
    this.pttalent = 0;
    this.sub = new Array<any>();
    
    this.events.subscribe(`charUpdate:${HomePage.charnb}`, (character: Character) => {
      this.niveau = character.Niveau;
      this.mainstat = this.charCalculator.getMainStat(character);
    });

    let charProvider = new CharacterProvider(this.events, HomePage.charnb, this.afDatabase);

    this.sub.push(this.afDatabase.list('/Character/' + HomePage.charnb + '/Aptitudes').snapshotChanges().subscribe(action => {
      this.dico = new Array<number>();
      this.skills = new Array<Aptitude>();
      this.pttalent = this.charCalculator.calcmodif(this.mainstat) + this.niveau - 1;
      for (let i = 0; i < action.length; i++) {
        let skill = <Aptitude>action[i].payload.val()
        this.skills.push(skill);
        let skillCost = Math.max(0, skill.Palier * 2 - 1);
        if (skillCost > 1) {
          this.pttalent = this.pttalent - skillCost;
        }
        if (+action[i].key > this.maxindex) {
          this.maxindex = +action[i].key;
        }
        this.dico[i] = +action[i].key;
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
