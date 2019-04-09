import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, MenuController, Navbar } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { CharacterProvider, Caracteristique, Character } from '../../providers/character/character';
import { EditComponent, line } from '../../components/edit/edit';
import { LevelupPage } from '../levelup/levelup';
import { CharchoicePage } from '../charchoice/charchoice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Navbar) navBar: Navbar;
  static charnb: number;
  static fromGM: boolean;

  sub: any;
  
  character: Character;
  
  returnToGM: boolean;
  expHidden: string;

  lifecolor: string;
  mentalcolor: string;
  fatiguecolor: string;
  concentrationcolor: string;
  experiencecolor: string;

  charTool: CharacterProvider;


  constructor(menuctrl : MenuController,public navCtrl: NavController, public afDatabase: AngularFireDatabase, navParam: NavParams, public modalCtrl: ModalController) {
    menuctrl.enable(true);

    let charId = navParam.get("charnb");
    if (charId != null) {
      HomePage.charnb = charId;
    }
    this.charTool = new CharacterProvider(HomePage.charnb, this.afDatabase);
    setTimeout(function () { this.character = this.charTool.getCharacter(); }, 1000);
    
    this.lifecolor = "darkred";
    this.mentalcolor = "darkgreen";
    this.fatiguecolor = "darkorange";
    this.concentrationcolor = "teal";
    this.experiencecolor = "darkblue";

    this.expHidden = navParam.get("hideexp");
    if(this.expHidden != undefined){
      HomePage.fromGM = this.expHidden == 'false';
    }else{
      this.expHidden = HomePage.fromGM ? "false" : "true";
    }

    this.returnToGM = navParam.get("return");
   
  }

  ionViewDidLoad() {
  }


  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
  
  removeAdrenaline() {
    if (!this.character.Adrenaline) {
      this.character.Adrenaline = 1;
    }
    let newadrenaline = +this.character.Adrenaline - 1;
    if (newadrenaline >= 0) {
      this.afDatabase.object('/Character/' + HomePage.charnb).update({ Adrenaline: newadrenaline });
    }
  }

  addAdrenaline() {
    if (!this.character.Adrenaline) {
      this.character.Adrenaline = 0;
    }
    let newadrenaline = +this.character.Adrenaline + 1;
    if (newadrenaline < 4) {
      this.afDatabase.object('/Character/' + HomePage.charnb).update({ Adrenaline: newadrenaline });
    }
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

  addExperience() {
    let params: line[] = new Array<line>();
    params.push(new line("Experience", 0, "Experience", true, this.character.Experience));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb}).present();
  }
}
