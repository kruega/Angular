import {Component} from '@angular/core';

@Component({
  selector: 'pjm-first-form-one-way',
  templateUrl: 'first-form-one-way.component.html',
})
export class FirstFormOneWayComponent {
  task: any;

  constructor() {
    this.task = {
      title: 'Neues Entwickler-Team zusammenstellen',
      description: 'Notwendige Kenntnisse Angular 2 & TypeScript'
    };
  }

  saveTask(value: any) {
    this.task = value;
  }
}
