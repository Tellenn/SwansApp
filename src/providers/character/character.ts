import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
@Injectable()
export class CharacterProvider
{

  constructor(public http: HttpClient, private firebase: Firebase) {
    
    console.log('Hello CharacterProvider Provider');
  }
}
