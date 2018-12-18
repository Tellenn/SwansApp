import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { CalculatorProvider } from '../../providers/character/character';
import { CharchoicePage } from '../charchoice/charchoice';
import { EditComponent, line } from '../../components/edit/edit';
import { LevelupPage } from '../levelup/levelup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  static charnb: number;
  static level: number;
  static exp: number;
  static mainstat: Caracteristique;
  static fromGM: boolean;

  sub: any;

  database: AngularFireDatabase;
  character: Character;

  maxLife: number;
  percentLife: number;
  OverPercentVie: number;

  maxMental: number;
  percentMental: number;
  OverPercentMental: number;

  maxFatigue: number;
  percentFatigue: number;
  OverPercentFatigue: number;

  maxConcentration: number;
  percentConcentration: number;
  OverPercentConcentration: number;

  maxExperience: number;
  percentExperience: number;

  returnToGM: boolean;

  lifecolor: string;
  mentalcolor: string;
  fatiguecolor: string;
  concentrationcolor: string;
  experiencecolor: string;

  expHidden: string;

  constructor(menuctrl : MenuController,public navCtrl: NavController, public afDatabase: AngularFireDatabase, calculator: CalculatorProvider, navParam: NavParams, public modalCtrl: ModalController) {
    menuctrl.enable(true);

    this.lifecolor = "darkred";
    this.mentalcolor = "darkgreen";
    this.fatiguecolor = "darkorange";
    this.concentrationcolor = "teal";
    this.experiencecolor = "darkblue";

    this.expHidden = navParam.get("hideexp");
    console.log(this.expHidden);
    HomePage.fromGM = this.expHidden == 'false';
    
    let temp = navParam.get("charnb");
    this.returnToGM = navParam.get("return");
    if (temp != null) {
      HomePage.charnb = temp;
    }
    this.database = afDatabase;
    this.sub = afDatabase.object('/Character/' + HomePage.charnb).snapshotChanges().subscribe(action => {
      this.character = <Character>action.payload.val();

      HomePage.level = this.character.Niveau;
      HomePage.exp = this.character.Experience;

      this.maxLife = (calculator.calcmodif(this.character.Caracteristiques.CON, this.character.Niveau - 1) + 8);
      if (this.character.Etat.Vie > this.maxLife) {
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Vie: this.maxLife });
      }
      this.percentLife = this.character.Etat.Vie / this.maxLife * 100;
      this.OverPercentVie = this.character.Etat.OverVie / this.maxLife * 100;

      this.maxMental = (calculator.calcmodif(this.character.Caracteristiques.CON, this.character.Niveau - 1) * 2 + 20);
      if (this.character.Etat.Mental > this.maxMental) {
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Mental: this.maxMental });
      }
      this.percentMental = this.character.Etat.Mental / this.maxMental * 100;
      this.OverPercentMental = this.character.Etat.OverMental / this.maxMental * 100;

      this.maxFatigue = 10;
      if (this.character.Etat.Fatigue > this.maxFatigue) {
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Fatigue: this.maxFatigue });
      }
      this.percentFatigue = this.character.Etat.Fatigue / this.maxFatigue * 100;
      this.OverPercentFatigue = this.character.Etat.OverFatigue / this.maxFatigue * 100;

      switch (this.character.MainStat) {
        case "DEX":
          HomePage.mainstat = this.character.Caracteristiques.DEX;
          this.maxConcentration = 2 * (this.character.Caracteristiques.DEX.Score + this.character.Caracteristiques.DEX.Modif + this.character.Caracteristiques.DEX.Natif);
          break;
        case "CON":
          HomePage.mainstat = this.character.Caracteristiques.CON;
          this.maxConcentration = 2 * (this.character.Caracteristiques.CON.Score + this.character.Caracteristiques.CON.Modif + this.character.Caracteristiques.CON.Natif);
          break;
        case "SAG":
          HomePage.mainstat = this.character.Caracteristiques.SAG;
          this.maxConcentration = 2 * (this.character.Caracteristiques.SAG.Score + this.character.Caracteristiques.SAG.Modif + this.character.Caracteristiques.SAG.Natif);
          break;
        case "INT":
          HomePage.mainstat = this.character.Caracteristiques.INT;
          this.maxConcentration = 2 * (this.character.Caracteristiques.INT.Score + this.character.Caracteristiques.INT.Modif + this.character.Caracteristiques.INT.Natif);
          break;
        case "FOR":
          HomePage.mainstat = this.character.Caracteristiques.FOR;
          this.maxConcentration = 2 * (this.character.Caracteristiques.FOR.Score + this.character.Caracteristiques.FOR.Modif + this.character.Caracteristiques.FOR.Natif);
          break;
        case "CHA":
          HomePage.mainstat = this.character.Caracteristiques.CHA;
          this.maxConcentration = 2 * (this.character.Caracteristiques.CHA.Score + this.character.Caracteristiques.CHA.Modif + this.character.Caracteristiques.CHA.Natif);
          break;
        default:
          this.maxConcentration = 0;
          break;
      }
      if (this.character.Etat.Concentration > this.maxConcentration) {
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Concentration: this.maxConcentration });
      }
      this.percentConcentration = this.character.Etat.Concentration / this.maxConcentration * 100;
      this.OverPercentConcentration = this.character.Etat.OverConcentration / this.maxConcentration * 100;
      if (HomePage.level == 1) {
        this.maxExperience = 500;
      } else {
        this.maxExperience = 1000 + 100 * (HomePage.level - 1);
      }
      this.percentExperience = this.character.Experience / this.maxExperience *100;
    });

  }


  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

  addLife() {
    let newlife = +this.character.Etat.Vie + 1;
    if (newlife <= this.maxLife) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Vie: newlife });
    }
  }
  removeLife() {
    let newlife = +this.character.Etat.Vie - 1;
    if (newlife >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Vie: newlife });
    }
  }

  addMental() {
    let newmental = +this.character.Etat.Mental + 1;
    if (newmental <= this.maxMental) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Mental: newmental });
    }
  }
  removeMental() {
    let newmental = this.character.Etat.Mental - 1;
    if (newmental >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Mental: newmental });
    }
  }

  addFatigue() {
    let newfatigue = +this.character.Etat.Fatigue + 1;
    if (newfatigue <= this.maxFatigue) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Fatigue: newfatigue });
    }
  }
  removeFatigue() {
    let newfatigue = +this.character.Etat.Fatigue - 1;
    if (newfatigue >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Fatigue: newfatigue });
      if (newfatigue / this.maxFatigue < this.character.Etat.Concentration / this.maxConcentration) {
        let newconcentration = Math.floor(newfatigue / this.maxFatigue * this.maxConcentration);
        this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Concentration: newconcentration });
      }
    }
  }

  addConcentration() {
    let newconcentration = +this.character.Etat.Concentration + 1;
    if (newconcentration <= this.maxConcentration) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Concentration: newconcentration });
    }
  }
  removeConcentration() {
    let newconcentration = +this.character.Etat.Concentration - 1;
    if (newconcentration >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Concentration: newconcentration });
    }
  }
  removeAdrenaline() {
    let newadrenaline = +this.character.Adrenaline - 1;
    if (newadrenaline >= 0) {
      this.database.object('/Character/' + HomePage.charnb).update({ Adrenaline: newadrenaline });
    }
  }
  addAdrenaline() {
    let newadrenaline = +this.character.Adrenaline + 1;
    if (newadrenaline < 4) {
      this.database.object('/Character/' + HomePage.charnb).update({ Adrenaline: newadrenaline });
    }
  }

  set(stuff: string, val: number, max: number) {
    let params:line[] = new Array<line>();
    params.push(new line(stuff,val,stuff));
    this.modalCtrl.create(EditComponent, { delete: false, params:params, path: "/Character/" + HomePage.charnb + "/Etat/"}).present();
  }

  editVanity() {
    let params: line[] = new Array<line>();
    params.push(new line("Nom", this.character.Nom, "Nom"));
    params.push(new line("Sexe", this.character.Sexe, "Sexe"));
    params.push(new line("Dextrie", this.character.Dextrie, "Dextrie"));
    params.push(new line("Taille", this.character.Taille, "Taille"));
    params.push(new line("Cheveux", this.character.Cheveux, "Cheveux"));
    params.push(new line("Yeux", this.character.Yeux, "Yeux"));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb }).present();
  }

  levelup(){
    this.navCtrl.push(LevelupPage, {path: "/Character/" + HomePage.charnb});
  }

  overcharge(val : number,stat:string) {
    let params: line[] = new Array<line>();
    params.push(new line(stat, val, stat));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb +"/Etat/"}).present();
  }

  addExperience() {
    let params: line[] = new Array<line>();
    params.push(new line("Experience", 0, "Experience", true, this.character.Experience));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb}).present();
  }
}
export class Aptitude {
  Concentration: number;
  LifeCondition: number;
  Nom: string;
  Palier: number;
  constructor(Nom: string ="", Concentration: number = 0, LifeCondition: number =0, Palier: number=0) {
    this.Nom = Nom;
    this.Concentration = Concentration;
    this.LifeCondition = LifeCondition;
    this.Palier = Palier;
  }
}

export class Attaque {
  Attaque: number;
  Critique: string;
  Degats: number;
  Nom: string;
  Temporalite: string;
  constructor(Nom: string = "", Temporalite: string = "", Attaque: number = 0, Degats: number = 0,Critique:string ="") {
    this.Nom = Nom;
    this.Temporalite = Temporalite;
    this.Attaque = Attaque;
    this.Degats = Degats;
    this.Critique = Critique;
  }
}

export class Caracteristique {
  Nom: string;
  Modif: number;
  Natif: number;
  Score: number;
  constructor(Nom: string = "", Natif: number = 0, Modif: number = 0, Score: number = 0) {
    this.Nom = Nom;
    this.Natif = Natif;
    this.Modif = Modif;
    this.Score = Score;
  }
}


export class Caracteristiques {
  CHA: Caracteristique;
  CON: Caracteristique;
  DEX: Caracteristique;
  FOR: Caracteristique;
  INT: Caracteristique;
  SAG: Caracteristique;
  constructor(CHA: Caracteristique, CON: Caracteristique, DEX: Caracteristique, FOR: Caracteristique, INT: Caracteristique, SAG: Caracteristique) {
    this.CHA = CHA;
    this.CON = CON;
    this.DEX = DEX;
    this.FOR = FOR;
    this.INT = INT;
    this.SAG = SAG;
  }
}

export class Competence {
  Nom: string;
  Base: string;
  Modif: number;
  Natif: number;
  constructor(Nom: string = "", Base: string = "", Modif: number = 0, Score: number = 0) {
    this.Nom = Nom;
    this.Natif = Modif;
    this.Modif = Modif;
    this.Base = Base;
  }
}

export class Defense {
  CA: number;
  ModDex: number;
  Nom: string;
  Temporalite: string;
  LimEsquive: number;
  constructor(Nom: string = "", Temporalite: string = "", CA: number = 0, ModDex: number = 0, LimEsquive:number =0) {
    this.Nom = Nom;
    this.Temporalite = Temporalite;
    this.CA = CA;
    this.ModDex = ModDex;
    this.LimEsquive = LimEsquive;
  }
}

export class Etat {
  Concentration: number;
  OverConcentration: number;
  Fatigue: number;
  OverFatigue: number;
  Mental: number;
  OverMental: number;
  Vie: number;
  OverVie: number;
  constructor(Vie: number = 0, Mental: number = 0, Fatigue: number = 0, Concentration: number = 0) {
    this.Vie = Vie;
    this.Mental = Mental;
    this.Fatigue = Fatigue;
    this.Concentration = Concentration;
  }
}

export class Inventaire {
  Nom: string;
  Temporalite: string;
  constructor(Nom: string = "", Temporalite: string = "") {
    this.Nom = Nom;
    this.Temporalite = Temporalite;
  }
}


export class Champ {
  Nom: string;
  Valeur: number;
  constructor(Nom: string = "", Valeur: number = 0) {
    this.Nom = Nom;
    this.Valeur = Valeur;
  }
}

export class Character {
  Adrenaline: number;
  Age: number;
  Aptitudes: Aptitude[];
  Attaque: Attaque[];
  Badges: string[];
  Caracteristiques: Caracteristiques;
  Cheveux: string;
  Competences: Competence[];
  Defense: Defense[];
  Dextrie: string;
  Etat: Etat;
  Experience: number = 0;
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

