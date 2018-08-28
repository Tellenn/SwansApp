import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
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
  pttalent: number;

  constructor(public afDatabase: AngularFireDatabase, modalCtrl: ModalController, calculator: CalculatorProvider) {
    this.modal = modalCtrl;
    this.maxindex = -1;
    afDatabase.object('/Character/' + HomePage.charnb + '/').snapshotChanges().subscribe(action => {
      let char = <Character>action.payload.val();
      let mainstat;
      switch (char.MainStat) {
        case "DEX":
          mainstat = char.Caracteristiques.DEX;
          break;
        case "CON":
          mainstat = char.Caracteristiques.CON;
          break;
        case "FOR":
          mainstat = char.Caracteristiques.FOR;
          break;
        case "INT":
          mainstat = char.Caracteristiques.INT;
          break;
        case "SAG":
          mainstat = char.Caracteristiques.SAG;
          break;
        case "CHA":
          mainstat = char.Caracteristiques.CHA;
          break;
        default:
          mainstat = null;
      }
      this.pttalent = calculator.calcmodif(mainstat, char.Niveau - 1);
    });
    console.log(this.pttalent);
    afDatabase.list('/Character/'+HomePage.charnb+'/Aptitudes').snapshotChanges().subscribe( action => {
      this.dico = new Array<number>();
      this.skills = new Array<Aptitude>();
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
    });
    
  }
  
  

  create() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", "", "Nom"));
    params.push(new line("Concentation", "", "Concentation"));
    params.push(new line("Life Condition", "", "LifeCondition"));
    params.push(new line("Palier", "", "Palier"));
    this.modal.create(EditComponent, {delete:false, params:params, path: "/Character/" + HomePage.charnb + "/Aptitudes/"+this.maxindex}).present();
  }

  edit(i:number){
    let params: line[] = new Array<line>();
    params.push(new line("Nom", this.skills[i].Nom, "Nom"));
    params.push(new line("Concentation", this.skills[i].Concentration, "Concentation"));
    params.push(new line("Life Condition", this.skills[i].LifeCondition, "LifeCondition"));
    params.push(new line("Palier", this.skills[i].Palier, "Palier"));
    this.modal.create(EditComponent, { delete: true, params: params,path: "/Character/" + HomePage.charnb + "/Aptitudes/" + this.dico[i]}).present();
  }
}

export interface Aptitude {
  Concentration: number;
  LifeCondition: number;
  Nom: string;
  Palier: number;
}

export interface Attaque {
  Attaque: number;
  Critique: string;
  Degats: number;
  Nom: string;
  Temporalite: string;
}

export interface Caracteristique {
  Nom: string;
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

export interface Competence {
  Nom: string;
  Base: string;
  Modif: number;
  Natif: number;
}

export interface Defense {
  CA: number;
  ModDex: number;
  Nom: string;
  Temporalite: string;
}

export interface Etat {
  Concentration: number;
  Fatigue: number;
  Mental: number;
  Vie: number;
}

export interface Inventaire {
  Nom: string;
  Temporalite: string;
}


export interface Champ {
  Nom: string;
  Valeur: number;
}

export interface Character {
  Age: number;
  Aptitudes: Aptitude[];
  Attaque: Attaque[];
  Caracteristiques: Caracteristiques;
  Cheveux: string;
  Competences: Competence[];
  Defense: Defense[];
  Dextrie: string;
  Etat: Etat;
  Inventaire: Inventaire[];
  Monnaie: Champ[];
  Joueur: string;
  Niveau: number;
  Nom: string;
  Reputation: Champ[];
  Sexe: string;
  Taille: string;
  Yeux: string;
  MainStat: string;
}
