import { Component, OnInit } from '@angular/core';
import * as model from '../../models/model-interfaces';
import {Task} from '../../models/model-interfaces';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../services/task-service/task.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {
  model = model;
  private task: Task

  constructor(private route: ActivatedRoute,
              private taskService: TaskService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.task = this.taskService.getTask(params['id']);
    });
  }

}
