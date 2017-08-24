import { BrowserModule, Title } from '@angular/platform-browser';
// import { APP_BASE_HREF } from '@angular/common';
import { NgModule, Directive } from '@angular/core';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { RouterLinkActive, RouterModule } from '@angular/router';
// //import {UserService} from './services/user.service';
// import {TaskService} from './services/task-service/task.service';
 import {routingComponents, appRouting, routingProviders } from './app.routing';
 import {LoginService} from './services/login-service/login-service';

 import { AppComponent } from './app.component';
// //import { ModelDFormComponent } from './model-d-form/model-d-form.component';
// import {APPLICATION_VALIDATORS} from './models/app-validators';
// import {ShowErrorComponent} from './show-error/show-error.component';
// //import { GeneratedFormComponent } from './generated-form/generated-form.component';
//import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
// // import{ QuestionsService} from'./services/question.services';
 import { TabsComponent, TabComponent } from './tabs/tabs.component';
// // import { FirstFormComponent } from './first-form/first-form.component';
// // import { FirstFormOneWayComponent } from './first-form-one-way/first-form-one-way.component';
 //import { FirstFormTwoWayComponent } from './first-form-two-way/first-form-two-way.component';
 import { TasksComponent } from './tasks/tasks.component';
// import { tasksRoutes} from './tasks/tasks.routing';
 import { TaskListComponent} from './tasks/task-list/task-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
 import {TaskItemComponent} from'./tasks/task-item/task-item.component';
 import {EditTaskComponent } from './tasks/edit-task/edit-task.component';
// import {UserResolver } from './login/user-resolver';
import { AUTH_ENABLED } from './app.tokens';
 import { NotFoundComponent } from './not-found/not-found.component';
 import { ChatComponent } from './chat-component/chat.component';
 import { TaskOverviewComponent } from './tasks/task-overview/task-overview.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [

    AppComponent,
    // ModelDFormComponent,
    // APPLICATION_VALIDATORS,
    // ShowErrorComponent,
    //GeneratedFormComponent,
     //TemplateDrivenFormComponent,
    
     TabsComponent,
    // TabComponent,
    // FirstFormComponent,
    // FirstFormOneWayComponent,
     //FirstFormTwoWayComponent,
    // routingComponents,
     TasksComponent,
    // tasksRoutes,
     TaskListComponent,
    DashboardComponent,
    SettingsComponent,
    AboutComponent,
     TaskItemComponent,
     EditTaskComponent,
     
    // UserResolver,
     NotFoundComponent,
     ChatComponent,
     TaskOverviewComponent,
     LoginComponent

  ],
  imports: [
    BrowserModule,
    // FormsModule,
     ReactiveFormsModule,
     appRouting,
      ],

  providers: [
    // routingProviders,
     LoginService,
    // TaskService,
    Title,
     { provide: AUTH_ENABLED, useValue: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
