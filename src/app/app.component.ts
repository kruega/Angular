import { Component, OnInit, Inject, Optional, Directive } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { LoginService } from './services/login-service/login-service';
import { TasksComponent } from './tasks/tasks.component';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  defaultTitle: string;

  constructor(public loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private titleService: Title){
              }

  ngOnInit() {
    this.defaultTitle = this.titleService.getTitle();
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        console.log(event);
        this.setBrowserTitle();
      });
  }

  setBrowserTitle() {
    let title = this.defaultTitle;
    let route = this.activatedRoute;
    while(route.firstChild) {
      route = route.firstChild;
      title = route.snapshot.data['title'] || title;
    }
    this.titleService.setTitle(title);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
    return false;
  }

  toggleChat() {
    if (!this.router.url.includes('chat')) {
      this.router.navigate([{outlets: {'bottom': ['chat']}}])
    }
    else {
      this.router.navigate([{outlets: {'buttom':null }}]);
    }
  }
}
