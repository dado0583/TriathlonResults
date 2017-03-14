import { Component} from '@angular/core';

@Component({
  selector: 'twoway',
  template: `
    <input type="text" [(ngModel)]="person.name">
    <input type="text" [(ngModel)]="person.name">
  `,
  styles: []
})
export class TwowayComponent  {

  person = {
    name: 'David',
    age: 33
  };
}
