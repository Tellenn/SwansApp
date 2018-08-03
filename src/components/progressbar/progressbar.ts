import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'progress-bar',
  templateUrl: 'progressbar.html'
})
export class ProgressbarComponent {
 
  @Input('progress') progress;
 
  constructor() {
 
  }
 
}