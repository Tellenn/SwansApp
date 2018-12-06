import { Component, Input } from '@angular/core';

@Component({
  selector: 'adrenaline',
  templateUrl: 'adrenaline.html'
})
export class AdrenalineComponent {

  @Input("adrenaline") adrenaline: number;
  text: string;

  constructor() {
  }

}
