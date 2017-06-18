import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Lesson } from './lesson.model';
import { Question } from './question.model'; 

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
	quiz_mode = false;
	question_changed = new Subject<Question>();
	subscription = new Subscription;
	lesson: Lesson;
	questions: Question[] = [
		new Question('Prvo pitanje?', ['odgovor1', 'odgovor2', 'odgovor3', 'odgovor4'], 'odgovor3'),
		new Question('Drugo pitanje?', ['odgovor1', 'odgovor2', 'odgovor3', 'odgovor4'], 'odgovor1'),
	];
	index: number;
	current_question: Question;

  constructor() { }

  ngOnInit() {
  	this.lesson = new Lesson('Ovo je neki testni tekst lessona', this.questions);
  	this.subscription = this.question_changed.subscribe((question: Question) => {
  		this.current_question = question;
  	});  	
  	this.index = 0;
		this.current_question = this.questions[0];

  }

  onQuizActivate(){
  	this.quiz_mode = true;
  }

  onSubmit(form: NgForm){
  		if (this.index != this.questions.length-1){
  			this.index++;
  			this.question_changed.next(this.questions[this.index]);
  		}
  		else{
  			this.quiz_mode = false;
  			this.index = 0;
  			this.question_changed.next(this.questions[this.index]);
  		} 
  }

}
