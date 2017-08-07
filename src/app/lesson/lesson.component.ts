import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {Lesson} from "./lesson.model";
import {Question} from "./question.model";
import {LessonService} from "../lesson.service";

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
  quiz_solved: boolean = false;
  attempted_solve: Array<string> = [];
  used_letters: Array<string> = [];
  correct_guesses: number = 0;
  unlisten: Array<any> = [];
  position: Boolean = false;

  @ViewChild('lesson_text') div_text;
  @ViewChild('input_answer') input;
  @ViewChild('hangman') hangman;
  @ViewChild('letters') letters;
  @ViewChild('answer') answer_array;
  @ViewChild('available') available_array;
  @ViewChild('used_letters') used_letters_node;

  constructor(private lessonService: LessonService, private route: ActivatedRoute, private router: Router, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.subscription_question = this.question_changed.subscribe(
      (question: Question) => {
        this.current_question = question;
        this.correct_guesses = 0;
        this.used_letters = [];
        this.quiz_solved = false;
      }
    );
    this.subscription_lesson = this.route.params.subscribe((params: Params) => {
      this.current_lesson = this.lessonService.getLesson(params['name']);
      if (this.lessonService.currentLessonList[this.lessonService.currentLessonList.indexOf(this.current_lesson) + 1] != null) {
        this.next_lesson = this.lessonService.currentLessonList[this.lessonService.currentLessonList.indexOf(this.current_lesson) + 1];
      } else {
        this.next_lesson = null;
      }
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
    if (this.current_question.type == 'hangman' || this.current_question.type == 'rearrange') {
      if (this.index != this.current_lesson.questions.length - 1) {
        if (this.current_question.type == 'rearrange') {
          this.answer_array.nativeElement.innerHTML = '';
        }
        if (this.current_question.type == 'hangman') {
          this.used_letters_node.nativeElement.innerHTML = '';
          for (let i = 0; this.current_question.correct_answer.length > i; i++) {
            this.letters.nativeElement.children[i].innerHTML = '_';
          }
        }
        this.index++;
        this.question_changed.next(this.current_lesson.questions[this.index]);
      } else {
        this.finishedQuiz();
      }
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
      this.renderer.listen(e, 'click', () => {
        (<any>window).responsiveVoice.speak(e.innerHTML, "Norwegian Female")
      });
    });
  }

  onEnterKey(letter: string, form: NgForm) {
    this.input.nativeElement.value += letter;
    if (this.current_question.type == "input" || this.current_question.type == 'guess') form.controls['question'].patchValue(this.input.nativeElement.value);
    else {
      form.controls['hangman'].patchValue(this.input.nativeElement.value);
    }
    this.input.nativeElement.focus();
  }

  finishedQuiz() {
    this.state = 'finished';
    if (this.next_lesson != null) {
      this.lessonService.updateAvailableLessons(this.next_lesson.name);
      this.lessonService.getLesson(this.next_lesson.name).available = true;
    }
    this.index = 0;
  }

  onCheck(form: NgForm) {
    let counter = 0;
    this.current_question.correct_answer.forEach((e, i) => {
      if (e == form.value.hangman) {
        if (this.letters.nativeElement.children[i].innerHTML != e) {
          this.letters.nativeElement.children[i].innerHTML = e;
          this.correct_guesses++;
          counter++;
          if (this.used_letters.indexOf(e) == -1) {
            this.used_letters.push(e);
            let span = document.createElement('span');
            span.style.color = 'green';
            span.style.display = 'inline';
            span.style.marginLeft = "4px";
            span.innerHTML = e;
            this.hangman.nativeElement.nextElementSibling.appendChild(span);
          }
        }
      }
    });
    if (!counter) {
      if (this.used_letters.indexOf(form.value.hangman) == -1) {
        this.used_letters.push(form.value.hangman);
        let span = document.createElement('span');
        span.style.color = 'red';
        span.style.display = 'inline';
        span.style.marginLeft = "4px";
        span.innerHTML = form.value.hangman;
        this.hangman.nativeElement.nextElementSibling.appendChild(span);
      }
    }
    form.controls['hangman'].reset();
    if (this.correct_guesses == this.current_question.correct_answer.length) {
      this.quiz_solved = true;
    }

  }

  shouldDisable(form: NgForm) {
    if (this.current_question.type == "radio" || this.current_question.type == "input" || this.current_question.type == "guess") return !form.valid;
    else return !this.quiz_solved;
  }

  onPush(e) {
    let div = document.createElement('div');
    div.innerHTML = e.target.innerText;
    this.attempted_solve.push(e.target.innerText);
    e.target.remove();
    this.renderer.setStyle(div, 'border', '3px solid #ffbf00');
    this.renderer.setStyle(div, 'display', 'inline-block');
    this.renderer.setStyle(div, 'padding', '10px 20px');
    this.renderer.setStyle(div, 'font-size', '24px');
    this.renderer.setStyle(div, 'font-variant', 'small-caps');
    this.renderer.setStyle(div, 'font-weight', 'bold');
    this.renderer.setStyle(div, 'cursor', 'pointer');
    this.renderer.setStyle(div, 'margin-right', '28px');
    this.renderer.setStyle(div, 'transform', 'rotate(' + this.getRandomInt() + 'deg)');
    this.unlisten.push(this.renderer.listen(div, 'click', (event) => this.onPop(event)));
    this.answer_array.nativeElement.appendChild(div);
    if (this.current_question.correct_answer.length == this.attempted_solve.length) {
      this.current_question.correct_answer.forEach((e, i) => {
        if (e == this.attempted_solve[i]) this.correct_guesses++;
      });
      if (this.correct_guesses == this.current_question.correct_answer.length) {
        this.unlisten.forEach((e) => e());
        this.quiz_solved = true;
        this.attempted_solve = [];
      } else {
        this.correct_guesses = 0;
      }
    }
  }

  onPop(event) {
    let div = document.createElement('div');
    div.innerHTML = event.target.innerText;
    this.attempted_solve.splice(this.attempted_solve.indexOf(event.target.innerText), 1);
    event.target.remove();
    this.renderer.setStyle(div, 'border', '3px solid #ffbf00');
    this.renderer.setStyle(div, 'display', 'inline-block');
    this.renderer.setStyle(div, 'padding', '10px 20px');
    this.renderer.setStyle(div, 'font-size', '24px');
    this.renderer.setStyle(div, 'font-variant', 'small-caps');
    this.renderer.setStyle(div, 'font-weight', 'bold');
    this.renderer.setStyle(div, 'cursor', 'pointer');
    this.renderer.setStyle(div, 'margin-right', '28px');
    this.renderer.setStyle(div, 'transform', 'rotate(' + this.getRandomInt() + 'deg)');
    this.renderer.listen(div, 'click', (event) => this.onPush(event));
    this.available_array.nativeElement.appendChild(div);
  }


  ngOnDestroy() {
    this.subscription_question.unsubscribe();
    this.subscription_lesson.unsubscribe();
  }

  getRandomInt() {
    let number = Math.floor(Math.random() * (5 - (1) + 1)) + 1;
    if (Math.random() < 0.5) return number * (-1);
    else return number;
  }

  getState(){
    if (Math.random() < 0.5) this.position = true;
  }
}
