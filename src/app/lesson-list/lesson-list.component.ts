import { Component, OnInit } from '@angular/core';

import { LessonComponent } from '../lesson/lesson.component';
import { LessonService } from '../lesson.service';
import { Lesson } from '../lesson/lesson.model';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
	lessonList: Lesson[];
	currentLesson: Lesson;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
  	this.lessonList = this.lessonService.getLessonList('vocabulary');
  }

}
