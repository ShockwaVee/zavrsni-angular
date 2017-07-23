import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LessonComponent } from './lesson/lesson.component';
import { AppRoutingModule } from './app-routing.module';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonService } from './lesson.service';
import { LessonStartComponent } from './lesson-start/lesson-start.component';
import { LessonListItemComponent } from './lesson-list/lesson-list-item/lesson-list-item.component';
import {UserService} from "./user/user.service";
import {ProgressService} from "./lesson/progress.service";
import {CapitalizePipe} from "./capitalize.pipe";
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthService} from "app/auth/auth.service";
import {AuthGuardService} from "./auth/auth-guard.service";
import {AdminPanelComponent} from "./auth/admin/admin-panel.component";
import { LessonAddComponent } from './auth/admin/lesson-add/lesson-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LessonComponent,
    LessonListComponent,
    LessonStartComponent,
    LessonListItemComponent,
    CapitalizePipe,
    SigninComponent,
    SignupComponent,
    AdminPanelComponent,
    LessonAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [LessonService, UserService, ProgressService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
