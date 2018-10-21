import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<String>;
  themestring: string;

  constructor(public storage: Storage) {
    this.theme = new BehaviorSubject('light-theme');
    this.storage.get('theme').then(val => {
      if (val != null) {
        this.theme.next(val);
      }
    });
  }

  setActiveTheme(val) {
    this.storage.set('theme', val);
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }
}
