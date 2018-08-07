import { Component } from '@angular/core';

/**
 * Generated class for the EditdefenseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'editdefense',
  templateUrl: 'editdefense.html'
})
export class EditdefenseComponent {

  text: string;

  constructor() {
    console.log('Hello EditdefenseComponent Component');
    this.text = 'Hello World';
  }

}
