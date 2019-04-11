import { Component, Input} from '@angular/core';
import { Events, ModalController } from 'ionic-angular';
import { Character, CharacterProvider } from '../../providers/character/character';
import { CharacterCalculatorProvider } from '../../providers/character-calculator/character-calculator';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../../pages/home/home';
import { EditComponent, line } from '../edit/edit';

@Component({
  selector: 'bar',
  templateUrl: 'bar.html'
})
export class BarComponent {

  @Input('newcolor') newcolor;
  @Input('type') type;
  @Input('buttonHidden') buttonHidden;
  @Input('ishidden') ishidden;
  @Input('charId') charId;

  charProvider: CharacterProvider;
  character: Character;
  value: number;
  max: number;
  percent: number;
  path: string;

  constructor(public modalCtrl: ModalController,public events: Events, public charCalc: CharacterCalculatorProvider, public afDatabase: AngularFireDatabase) {
  }
  ngOnInit() {
    this.events.subscribe(`charUpdate:${this.charId}`, (character: Character) => {
      this.character = character;
      switch (this.type) {
        case "life":
          this.value = this.character.Etat.Vie;
          this.max = this.charCalc.getMaxLife(this.character);
          this.path = `/Character/${this.charId}/Etat/Vie`
          break;
        case "mentalLife":
          this.value = this.character.Etat.Mental;
          this.max = this.charCalc.getMaxMentalLife(this.character);
          this.path = `/Character/${this.charId}/Etat/Mental`
          break;
        case "weariness":
          this.value = this.character.Etat.Fatigue;
          this.max = this.charCalc.getMaxWeariness(this.character);
          this.path = `/Character/${this.charId}/Etat/Fatigue`
          break;
        case "concentration":
          this.value = this.character.Etat.Concentration;
          this.max = this.charCalc.getMaxFocus(this.character);
          this.path = `/Character/${this.charId}/Etat/Concentration`
          break;
        case "experience":
          this.value = this.character.Experience;
          this.max = this.charCalc.getExpToNextLevel(this.character);
          this.path = `/Character/${this.charId}/Experience`
          break;
        default:
          console.error('Error triggered : Unkown bar type. Check the bar type where it\'s defined');
          throw new Error("Unkown bar type. Check the bar type where it's defined");
      };
      this.percent = this.value / this.max * 100;
    });
    this.charProvider = new CharacterProvider(this.events, this.charId, this.afDatabase);
  }

  add() {
    let newValue = +this.value+1
    if (newValue <= this.max) {
      this.afDatabase.object(this.path).set(newValue);
    }
  }
  remove() {
    let newValue = +this.value - 1;
    if (newValue >= 0) {
      this.afDatabase.object(this.path).set(newValue);
    }
  }

  set(stuff: string, val: number, max: number) {
    if (this.buttonHidden != 'true') {
      switch (stuff) {
        case "life":
          stuff = "Vie";
          break;
        case "mentalLife":
          stuff = "Mental";
          break;
        case "weariness":
          stuff = "Fatigue";
          break;
        case "concentration":
          stuff = "Concentration";
          break;
        case "experience":
          stuff = "Experience";
          break;
        default:
          console.error('Error triggered : Unkown bar type. Check the bar type where it\'s defined');
          throw new Error("Unkown bar type. Check the bar type where it's defined");
      };
      let params: line[] = new Array<line>();
      params.push(new line(stuff, val, stuff));
      this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb + "/Etat/" }).present();
    }
  }

  overcharge(val: number, stat: string) {
    
    let params: line[] = new Array<line>();
    params.push(new line(stat, val, stat));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb + "/Etat/" }).present();
    
  }

}
