import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'pjm-first-form-two-way',
  templateUrl: 'first-form-two-way.component.html',
})
export class FirstFormTwoWayComponent {

  @ViewChild(NgForm) ngForm: NgForm;

  task: any = {
    title: 'Neues Entwickler-Team zusammenstellen',
    description: 'Notwendige Kenntnisse Angular 2 & TypeScript'
  };

  saveTask(value: any) {
    this.task = value;
  }

}