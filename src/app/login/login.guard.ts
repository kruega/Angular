import { Injectable, Optional }    from '@angular/core';
import {CanActivate,
        Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot } from '@angular/router';
import { Observable }    from 'rxjs/Observable';
import { LoginService } from '../services/login-service/login-service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(routeSnapshot: ActivatedRouteSnapshot,
              routerSnapshot: RouterStateSnapshot): Observable<boolean> | boolean {

    if (!this.loginService.isLoggedIn()) {
      const url = encodeURI(routerSnapshot.url);
      this.router.navigate(['/login'], {queryParams: {redirect: url}});
    }
    return true;
  }
}
