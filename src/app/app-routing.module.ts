import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {LessonListComponent} from './lesson-list/lesson-list.component';
import {LessonStartComponent} from './lesson-start/lesson-start.component';
import {LessonComponent} from './lesson/lesson.component';
import {ProgressGuard} from "./lesson/progress-guard.service";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {AdminPanelComponent} from "./auth/admin/admin-panel.component";
import {LessonAddComponent} from "./auth/admin/lesson-add/lesson-add.component";
import {AdminGuardService} from "./auth/admin/admin-guard.service";

const appRoutes: Routes = [
  {
    path: 'admin', component: AdminPanelComponent, canActivate:[AdminGuardService], children: [
    {path: '', component: LessonAddComponent}
  ]
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: ':type', component: LessonListComponent, canActivate: [AuthGuardService], children: [
    {path: '', component: LessonStartComponent},
    {path: ':name', component: LessonComponent, canActivate: [ProgressGuard]}
  ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [ProgressGuard]
})

export class AppRoutingModule {

}
