import {Component, ViewChild, OnDestroy, OnInit, Renderer2} from "@angular/core";
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
  word_solved: boolean = false;
  used_letters: Array<string> = [];
  correct_guesses: number = 0;

  @ViewChild('lesson_text') div_text;
  @ViewChild('input_answer') input;
  @ViewChild('hangman') hangman;

  constructor(private lessonService: LessonService, private userService: UserService, private route: ActivatedRoute, private router: Router, private renderer: Renderer2) {
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
      this.setLessonText();
      this.index = 0;
      this.question_changed.next(this.current_lesson.questions[this.index]);
    });
    this.setLessonText();
    this.index = 0;
    this.current_question = this.current_lesson.questions[0];
  }

  onQuizActivate() {
    this.state = 'quiz';
  }

  onNextLesson() {
    this.router.navigate([this.route.parent.snapshot.params.type, this.next_lesson.name]);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.current_question.type == 'hangman') {
      this.index++;
      this.question_changed.next(this.current_lesson.questions[this.index]);
    }
    else {
      let re = new RegExp(this.current_question.correct_answer);
      if (re.test(value.question.trim().toLowerCase())) {
        this.incorrect = false;
        if (this.index != this.current_lesson.questions.length - 1) {
          this.index++;
          this.question_changed.next(this.current_lesson.questions[this.index]);
        } else {
          this.finishedQuiz();
        }
      }
      else {
        this.incorrect = true;
      }
    }
  }

  setLessonText() {
    this.state = 'lesson';
    this.div_text.nativeElement.innerHTML = this.current_lesson.lesson_text;
    let words = document.querySelectorAll('.pronounce');
    Array.from(words).forEach((e) => {
      this.renderer.listen(e, 'click', (event) => {
        (<any>window).responsiveVoice.speak(e.innerHTML, "Norwegian Female")
      });
    });
  }

  onEnterKey(letter: string, form: NgForm) {
    this.input.nativeElement.value += letter;
    if (this.current_question.type == "input") form.controls['question'].patchValue(this.input.nativeElement.value);
    else{
      form.controls['hangman'].patchValue(this.input.nativeElement.value)
    }
  }

  finishedQuiz() {
    this.state = 'finished';
    this.userService.current_user.setLesson(this.next_lesson.name);
    this.lessonService.getLesson(this.next_lesson.name).available = true;
    this.index = 0;
  }

  onCheck(form: NgForm) {
    let counter = 0;
    this.current_question.correct_answer.forEach((e, i) => {
      if (e == form.value.hangman) {
        this.hangman.nativeElement.children[i].innerHTML = e;
        this.correct_guesses++;
        counter++;
        if (this.used_letters.indexOf(e) == -1) {
          this.used_letters.push(e);
          let p = document.createElement('p');
          p.innerHTML = e;
          this.hangman.nativeElement.nextElementSibling.append(p);
        }
      }
    });
    if (!counter) {
      if (this.used_letters.indexOf(form.value.hangman) == -1) {
        this.used_letters.push(form.value.hangman);
        let p = document.createElement('p');
        p.innerHTML = form.value.hangman;
        this.hangman.nativeElement.nextElementSibling.append(p);
      }
    }
    form.controls['hangman'].reset();
    if (this.correct_guesses == this.current_question.correct_answer.length) {
      this.word_solved = true;
    }

  }


  ngOnDestroy() {
    this.subscription_question.unsubscribe();
    this.subscription_lesson.unsubscribe();
  }
}
