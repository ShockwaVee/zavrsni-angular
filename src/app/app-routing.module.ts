import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {LessonListComponent} from './lesson-list/lesson-list.component';
import {LessonStartComponent} from './lesson-start/lesson-start.component';
import {LessonComponent} from './lesson/lesson.component';
import {ProgressGuard} from "./lesson/progress-guard.service";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";

const appRoutes: Routes = [
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: ':type', component: LessonListComponent, children: [
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
