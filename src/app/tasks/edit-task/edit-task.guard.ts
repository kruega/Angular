import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { EditTaskComponent } from './edit-task.component';


@Injectable()
export class EditTaskGuard implements CanDeactivate<EditTaskComponent> {

    canDeactivate(component: EditTaskComponent,
                route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot)
                            :Observable<boolean> | boolean {
        return component.canDeactivate();
    }
                                    
}