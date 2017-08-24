import {Task} from '../../models/model-interfaces';
import {Observable} from 'rxjs/Observable';

const STORAGE_KEY = 'tasks_formulare';

export class TaskService {
    tasks: Task[] = [];
    
      constructor() {
        this._loadFromLocalStorage();
      }
    
      findTasks(query = ''): Task[] {
        if (!query) {
          return this.tasks;
        }
        return this.tasks.filter(task => {
          return ((task.title && task.title.indexOf(query) !== -1) ||
            (task.description && task.description.indexOf(query) !== -1) ||
            (task.state && task.state.indexOf(query) !== -1)
          );
        });
      }
    
      findTasksAsync(query = ''): Observable<Task[]> {
        return Observable.of(this.findTasks(query));
      }
    
    
      getTask(id: number | string): Task {
        const task = this.tasks.filter(_task => _task.id == id)[0];
        return <Task>(Object.assign({}, task));
      }
    
      getTaskAsync(id: number | string): Observable<Task> {
        return Observable.of(this.getTask(id));
      }
    
      saveTask(task: Task) {
        if (task.id) {
          this.tasks = this.tasks.map(_task => {
            return _task.id === task.id ? task : _task;
          });
        } else {
          task.id = new Date().getTime(); // Pseudo Id
          this.tasks = [...this.tasks, task];
        }
        this._saveToLocalStorage();
        return task;
      }
    
      deleteTask(task: Task) {
        this.tasks = this.tasks.filter(_task => _task.id !== task.id);
        this._saveToLocalStorage();
      }
    
      _saveToLocalStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
      }
    
      _loadFromLocalStorage() {
        const tasksString = localStorage.getItem(STORAGE_KEY);
        if (tasksString) {
          this.tasks = <Task[]>JSON.parse(tasksString);
        } else {
          this.tasks = [
            {
              id: 1,
              title: 'Neues Entwickler-Team zusammenstellen ',
              description: 'Das ist wirklich sehr dringend. Bitte so schnell wie möglich darum kümmern...',
              state: 'IN_PROGRESS',
              assignee: {
                name: 'John Doe',
                email: 'john@doe.com'
              }
            }, {
              id: 2,
              title: 'Ersten Prototyp mit Angular 2.0 entwickeln',
              description: 'Der Prototyp soll zeigen, wie Routing und HTTP-Anbindung umgesetzt werden können.',
              state: 'BACKLOG',
              tags: [{
                label: 'wichtig'
              }, {
                label: 'dringend'
              }],
              assignee: {
                name: 'John Doe',
                email: 'john@doe.com'
              }
            }];
        }
      }
    
    }

