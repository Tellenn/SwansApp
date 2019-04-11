import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Events } from 'ionic-angular';
import { Character, CharacterProvider } from '../../providers/character/character';

@Component({
  selector: 'adrenaline',
  templateUrl: 'adrenaline.html'
})
export class AdrenalineComponent {
  
  @Input("charId") charId: number;
  text: string;
  character: Character;
  charProvider: CharacterProvider;

  constructor(public afDatabase: AngularFireDatabase, public events: Events) {
  }

  ngOnInit() {
    this.events.subscribe(`charUpdate:${this.charId}`, (character) => {
      this.character = character;
    });
    this.charProvider = new CharacterProvider(this.events, this.charId, this.afDatabase);
  }

  remove() {
    if (!this.character.Adrenaline) {
      this.character.Adrenaline = 1;
    }
    if (this.character.Adrenaline > 0) {
      let newadrenaline = +this.character.Adrenaline - 1;
      this.afDatabase.object(`/Character/${this.charId}`).update({ Adrenaline: newadrenaline });
    }
  }
 

  add() {
    if (!this.character.Adrenaline) {
      this.character.Adrenaline = 0;
    }
  if (this.character.Adrenaline < 3) {
      let newadrenaline = +this.character.Adrenaline + 1;
    this.afDatabase.object(`/Character/${this.charId}`).update({ Adrenaline: newadrenaline });
    }
  }

}
