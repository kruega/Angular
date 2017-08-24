import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { TaskService } from '../../services/task-service/task.service';
import { Task, createInitialTask } from '../../models/model-interfaces';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService],
})


export class TaskListComponent implements OnInit {

  selectedTaskId: string | number = null;


  tasks: Task[];

  searchTerm = new FormControl();

  constructor(
    private location: Location,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      const query = decodeURI(params['query'] || '');
      this.searchTerm.setValue(query);
      this.tasks = this.taskService.findTasks(query);
    });


    this.route.fragment.subscribe((fragment) => {
      if (!fragment) { return; }
      const [key, value] = fragment.split('=');
      if (key === 'select' && value !== undefined) {
        this.selectTask(Number(value)); // "1" -->  1
      }
    });

    const query = this.route.snapshot.queryParams['query'];
    this.tasks = this.taskService.findTasks(query);

    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      const [key, value] = fragment.split('=');
      if (key === 'select' && value !== undefined) {
        this.selectTask(Number(value));
      }
    }
  }
  deleteTask(task) {
    this.taskService.deleteTask(task);
    this.findTasks(this.searchTerm.value);
  }

  selectTask(taskId: number) {
    this.selectedTaskId = taskId;

    this.router.navigate([{outlets: {'right': ['overview', taskId]}}],
                          {relativeTo: this.route});
  }

  findTasks(queryString: string) {
    this.tasks = this.taskService.findTasks(queryString);
    this.adjustBrowserUrl(queryString);
  }

  adjustBrowserUrl(queryString: string = '') {
    const absoluteUrl = this.location.path().split('?')[0];
    const queryPart = queryString !== '' ? `query=${queryString}` : '';

    this.location.go(absoluteUrl, queryPart);
  }
}
