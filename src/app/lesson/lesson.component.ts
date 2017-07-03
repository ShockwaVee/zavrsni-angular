import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Lesson} from "./lesson.model";
import {Question} from "./question.model";
import {LessonService} from '../lesson.service';
import {UserService} from "../user/user.service";

@Component({
  selector: "app-lesson",
  templateUrl: "./lesson.component.html",
  styleUrls: ["./lesson.component.css"]
})
export class LessonComponent implements OnInit, OnDestroy {
  state: string = 'lesson';
  question_changed = new Subject<Question>();
  subscription_question = new Subscription();
  subscription_lesson = new Subscription();
  index: number;
  current_lesson: Lesson;
  current_question: Question;
  next_lesson: Lesson;
  incorrect: boolean = false;

  @ViewChild('lesson_text') div_text: ElementRef;

  constructor(private lessonService: LessonService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.subscription_question = this.question_changed.subscribe(
      (question: Question) => {
        this.current_question = question;
      }
    );
    this.subscription_lesson = this.route.params.subscribe((params: Params) => {
      this.current_lesson = this.lessonService.getLesson(params['name']);
      this.next_lesson = this.lessonService.currentLessonList[this.lessonService.currentLessonList.indexOf(this.current_lesson) + 1];
      this.state = 'lesson';
      this.div_text.nativeElement.innerHTML = this.current_lesson.lesson_text;
      this.index = 0;
      this.question_changed.next(this.current_lesson.questions[this.index]);
    });
    this.state = 'lesson';
    this.div_text.nativeElement.innerHTML = this.current_lesson.lesson_text;
    this.index = 0;
    this.current_question = this.current_lesson.questions[0];
  }

  onQuizActivate() {
    this.state = 'quiz';
  }

  onNextLesson(){
    this.router.navigate([this.route.parent.snapshot.params.type, this.next_lesson.name]);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (value.question === this.current_question.correct_answer) {
      this.incorrect = false;
      if (this.index != this.current_lesson.questions.length - 1) {
        this.index++;
        this.question_changed.next(this.current_lesson.questions[this.index]);
      } else {
        this.state = 'finished';
        this.userService.current_user.setLesson(this.next_lesson.name);
        this.lessonService.getLesson(this.next_lesson.name).available = true;
        this.index = 0;

      }
    }
    else {
      this.incorrect = true;
    }
  }

  onSay(){
    let speech = new SpeechSynthesisUtterance('jeg spraker norsk');
    speechSynthesis.getVoices().forEach((e) => {
      if (e.name == 'norwegian') speech.voice = e;
    });
    speechSynthesis.speak(speech);

  }

  ngOnDestroy() {
    this.subscription_question.unsubscribe();
    this.subscription_lesson.unsubscribe();
  }
}
