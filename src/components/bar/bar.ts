import { Component, Input} from '@angular/core';

@Component({
  selector: 'bar',
  templateUrl: 'bar.html'
})
export class BarComponent {
  @Input('progress') progress;
  @Input('max') max;
  @Input('percent') percent;
  @Input('newcolor') newcolor;
  @Input('overcharge') overcharge;
  @Input('overpercent') overpercent;
  @Input('ishidden') ishidden;


  constructor() {
  }


  add() {
    let newlife = +this.character.Etat.Vie + 1;
    if (newlife <= this.maxLife) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Vie: newlife });
    }
  }
  remove() {
    let newlife = +this.character.Etat.Vie - 1;
    if (newlife >= 0) {
      this.database.object('/Character/' + HomePage.charnb + '/Etat').update({ Vie: newlife });
    }
  }

  set(stuff: string, val: number, max: number) {
    let params: line[] = new Array<line>();
    params.push(new line(stuff, val, stuff));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb + "/Etat/" }).present();
  }

  overcharge(val: number, stat: string) {
    let params: line[] = new Array<line>();
    params.push(new line(stat, val, stat));
    this.modalCtrl.create(EditComponent, { delete: false, params: params, path: "/Character/" + HomePage.charnb + "/Etat/" }).present();
  }

  // Add button with option to hide it given parameters

}
