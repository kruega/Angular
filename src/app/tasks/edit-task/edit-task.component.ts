import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { TaskService } from '../../services/task-service/task.service';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { Task, createInitialTask } from '../../models/model-interfaces';
import { NgForm, FormsModule } from '@angular/forms'
import { Location } from '@angular/common';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  providers: [TaskService]
})

export class EditTaskComponent implements OnInit, OnDestroy {
  //model = model;
  task:Task = createInitialTask();
  subscription: Subscription;
  saved = false;

  @ViewChild(NgForm) form: NgForm;
  canDeactivate(): boolean {
    if (this.saved || !this.form.dirty) {
      return true;
    }
    return window.confirm(`Ihr Formular bestizt ungespeicherte 
                          Änderungen, möchten Sie die Seite wirklich verlassen`);
  }

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router,
              private location: Location) { }

 
              
  ngOnInit() {
    this.subscription = this.route.params
        .subscribe(params => {
          const id = (params['id'] || '');
          this.task = id ? this.taskService.getTask(id) : createInitialTask();
        
        });
    }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTag() {
    this.task.tags = this.task.tags || [];
    this.task.tags.push({label: ''});
    return false;
  }

  removeTag(i: number) {
    this.task.tags.splice(i, 1);
    return false;
  }

  saveTask() {
    this.task = this.taskService.saveTask(this.task);
    const relUrl = this.router.url.includes('edit') ? '../..' : '..';
    this.router.navigate([relUrl],{relativeTo: this.route});
  } 

  cancel() {
    this.router.navigateByUrl('/tasks');
    return false;
  }
}
