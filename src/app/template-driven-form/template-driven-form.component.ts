import {ViewChild, Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Task, createInitialTask} from '../models/model-interfaces';
import * as model from '../models/model-interfaces';
import {TaskService} from '../services/task-service/task.service';


@Component({
  selector: 'pjm-template-driven-form',
  templateUrl: 'template-driven-form.component.html',
})
export class TemplateDrivenFormComponent {

  model = model;

  task: Task = createInitialTask();

  @ViewChild(NgForm) ngForm: NgForm;

  constructor(private taskService: TaskService) {
  }

  addTag() {
    this.task.tags.push({label: ''});
    return false;
  }

  removeTag(i: number) {
    this.task.tags.splice(i, 1);
    return false;
  }

  saveTask(value: any) {
    console.log(value);
    console.log("Task", this.task);
    this.task = this.taskService.saveTask(this.task);
  }

}
