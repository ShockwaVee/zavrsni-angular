import {Component, OnDestroy, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params} from '@angular/router';

import {Lesson} from "./lesson.model";
import {Question} from "./question.model";
import {LessonService} from '../lesson.service';

@Component({
  selector: "app-lesson",
  templateUrl: "./lesson.component.html",
  styleUrls: ["./lesson.component.css"]
})
export class LessonComponent implements OnInit, OnDestroy {
  quiz_mode = false;
  question_changed = new Subject<Question>();
  subscription_question = new Subscription();
  subscription_lesson = new Subscription();
  index: number;
  current_lesson: Lesson;
  current_question: Question;
  incorrect: boolean = false;

  constructor(private lessonService: LessonService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription_question = this.question_changed.subscribe(
      (question: Question) => {
        this.current_question = question;
      }
    );
    this.subscription_lesson = this.route.params.subscribe((params: Params) => {
      this.current_lesson = this.lessonService.getLesson(params['name']);
      this.quiz_mode = false;
      this.index = 0;
      this.question_changed.next(this.current_lesson.questions[this.index]);
    });
    this.index = 0;
    this.current_question = this.current_lesson.questions[0];
  }

  onQuizActivate() {
    this.quiz_mode = true;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (value.question === this.current_question.correct_answer) {
      this.incorrect = false;
      if (this.index != this.current_lesson.questions.length - 1) {
        this.index++;
        this.question_changed.next(this.current_lesson.questions[this.index]);
      } else {
        this.quiz_mode = false;
        this.index = 0;
        this.question_changed.next(this.current_lesson.questions[this.index]);
      }
    }
    else {
      this.incorrect = true;
    }
  }

  ngOnDestroy() {
    this.subscription_question.unsubscribe();
    this.subscription_lesson.unsubscribe();
  }
}
