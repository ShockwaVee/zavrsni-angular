import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonStartComponent } from './lesson-start/lesson-start.component';
import { LessonComponent } from './lesson/lesson.component';

const appRoutes: Routes = [
	{path: '', component: LessonListComponent, children:[
		{path: '', component: LessonStartComponent},
		{path: ':name', component: LessonComponent, }
	],
},
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule{

}