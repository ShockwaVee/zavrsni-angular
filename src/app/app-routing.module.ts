import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {LessonComponent} from './lesson/lesson.component';

const appRoutes: Routes = [
	{path: '', component: LessonComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule]
})

export class AppRoutingModule{

}