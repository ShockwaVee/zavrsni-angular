import { Component, OnInit } from '@angular/core';

import { Lesson } from './lesson.model';
import { Question } from './question.model'; 

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
	quiz_mode = false;
	lesson: Lesson;
	questions: Question[] = [
		new Question('Prvo pitanje?', ['odgovor1', 'odgovor2', 'odgovor3', 'odgovor4'], 'odgovor3'),
		new Question('Drugo pitanje?', ['odgovor1', 'odgovor2', 'odgovor3', 'odgovor4'], 'odgovor1'),
	]

  constructor() { }

  ngOnInit() {
  	this.lesson = new Lesson('Ovo je neki testni tekst lessona', this.questions);
  }

  onQuizActivate(){
  	this.quiz_mode = true;
  }

}
