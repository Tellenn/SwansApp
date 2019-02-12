import { Injectable } from '@angular/core';
import { Caracteristique } from '../../pages/home/home';

@Injectable()
export class CalculatorProvider {

  constructor() {
  }

  calcmodif(carac: Caracteristique, bonus:number=0) {
    let sum = carac.Natif + carac.Modif + carac.Score + bonus;
    let mod;
    if (sum > 10)
      mod = Math.floor((sum - 10) / 2);
    else
      mod = -Math.ceil((10 - sum) / 2);
    return mod;
  }


}
