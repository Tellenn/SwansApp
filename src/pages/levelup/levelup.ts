import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
import { Caracteristique, Competence, Caracteristiques, Character } from '../../providers/character/character';


@IonicPage()
@Component({
  selector: 'page-levelup',
  templateUrl: 'levelup.html',
})
export class LevelupPage {
  stat1: Caracteristique;
  stat2: Caracteristique;
  comp1: number;
  comp2: number;
  comp3: number;
  comp4: number;
  comp5: number;
  comps: Competence[];
  dicocomp: string[];
  stats: Caracteristique[];
  path: string;
  sub: any;
  exp: any;

  charNb: number;
  level: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    this.path = navParams.get("path");
    this.sub = new Array<any>();
    this.charNb = +this.path.split("/")[2];
    this.sub.push(afDatabase.list(this.path + "/Competences").snapshotChanges().subscribe(action => {
      this.comps = new Array<Competence>();
      this.dicocomp = new Array<string>();
      for (let i = 0; i < action.length; i++) {
        this.comps.push(<Competence>action[i].payload.val());
        this.dicocomp.push(action[i].key);
      }
    }));
    this.sub.push(afDatabase.object(this.path + "/Caracteristiques").snapshotChanges().subscribe(action => {
      this.stats = new Array<Caracteristique>();
      let allstats: Caracteristiques = <Caracteristiques>action.payload.val();
      this.stats.push(allstats.CHA);
      this.stats.push(allstats.CON);
      this.stats.push(allstats.FOR);
      this.stats.push(allstats.DEX);
      this.stats.push(allstats.INT);
      this.stats.push(allstats.SAG);
    }));
    let events: Events = new Events();
    events.subscribe(`charUpdate:${this.charNb}`, (character) => {
      this.level = character.Niveau;
    });

    this.sub.push(afDatabase.object(this.path).snapshotChanges().subscribe(action => {
      let char = <Character>action.payload.val();
      this.exp = char.Experience;
    }));
  }

  ionViewDidLeave() {
    for (let i = 0; i < this.sub.length; i++) {
      this.sub[i].unsubscribe();
    }
  }
  validate() {
    let removeExp;
    if (this.level == 1) {
      removeExp = 500;
    } else {
      removeExp = 1000 + 100 * (this.level - 1);
    }

    this.afDatabase.object(this.path).update({ Niveau: this.level + 1 });

    if (this.stat1 == this.stat2) {
      this.afDatabase.object(this.path + "/Caracteristiques/" + this.stat1.Nom).update({ Modif: +this.stat1.Modif + 2 });
    } else {
      this.afDatabase.object(this.path + "/Caracteristiques/" + this.stat1.Nom).update({ Modif: +this.stat1.Modif + 1 });
      this.afDatabase.object(this.path + "/Caracteristiques/" + this.stat2.Nom).update({ Modif: +this.stat2.Modif + 1 });
    }
    for (let i = 0 ; i< this.dicocomp.length ; i++){
      let count = 0;
      if(this.comp1 == i){
        count++;
      }
      if(this.comp2 == i){
        count++;
      }
      if(this.comp3 == i){
        count++;
      }
      if(this.comp4 == i){
        count++;
      }
      if(this.comp5 == i){
        count++;
      }
      if(count > 0){
        this.afDatabase.object(this.path + "/Competences/" + this.dicocomp[i]).update({ Modif: +this.comps[i].Modif + count });
      }
    }
    // REMOVE EXPS
    this.exp = this.exp - removeExp;
    console.log(this.exp);
    this.afDatabase.object(this.path).update({ Experience: this.exp });
    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage, { charnb: HomePage.charnb, hideexp: "true"});
  }
  back() {
    this.navCtrl.pop();
  }
}
