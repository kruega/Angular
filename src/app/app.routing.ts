import { OpaqueToken } from '@angular/core';
import { Routes, RouterModule,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tasksRoutes, tasksRoutingComponents } from './tasks/tasks.routing';
import { TaskService } from './services/task-service/task.service';
import { LoginGuard } from './login/login.guard';

import { NotFoundComponent } from './not-found/not-found.component';
import { ChatComponent } from './chat-component/chat.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { UserResolver } from './login/user-resolver';
import { RESOLVED_TOKEN } from './app.tokens';
import { LoginComponent } from './login/login.component';


export const appRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent, data:{title: 'Startseite'}},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'settings', component: SettingsComponent,
      resolve: {
          user: UserResolver,
          token: RESOLVED_TOKEN
      }                  
    },
    {path: 'about', component: AboutComponent, data: {title: 'Über uns'}},
    {path: 'login', component: LoginComponent},
    { path: 'chat', component: ChatComponent, outlet: 'bottom'},
    {path: 'tasks', children: tasksRoutes},
    {path: '**', component: NotFoundComponent}, //letzte Konfiguration sonst Überdeckung
];

export const appRouting = RouterModule.forRoot(appRoutes, {
    useHash: true
}
);

export const routingComponents = [
    DashboardComponent, SettingsComponent, AboutComponent, ...tasksRoutingComponents   
];

export function resolveToken(route: ActivatedRouteSnapshot,
                            state: RouterStateSnapshot) {
    return localStorage.getItem('access-token');
}

export const routingProviders = [LoginGuard, UserResolver,
{ provide: RESOLVED_TOKEN, useValue: resolveToken},
];
