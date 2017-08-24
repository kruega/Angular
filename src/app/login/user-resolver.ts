import { Injectable, } from '@angular/core';
import {LoginService, User} from '../services/login-service/login-service';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private loginService: LoginService) {
    }
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<User> {
      return this.loginService.getCurrentUser();
            }
}