import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Question} from "../../../lesson/question.model";
import {NgForm} from "@angular/forms";
import {Lesson} from "../../../lesson/lesson.model";
import {Http} from "@angular/http";
import {AuthService} from "../../auth.service";
import {LessonService} from "../../../lesson.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css']
})
export class LessonAddComponent implements OnInit, OnDestroy, OnChanges {
  questionsArray: Array<Question> = [];
  answersArray = [];
  fewQuestions: Boolean;
  subscription = new Subscription();
  @Input() lessonEdited: Lesson;
  @ViewChild('f') f: NgForm;

  constructor(private http: Http, private authService: AuthService, private lessonService: LessonService) {
  }

  ngOnInit() {
    if (this.lessonEdited != null) {
      this.fillForm()
    }


  }


  onAddQuestion() {
    this.questionsArray.push(new Question('', '', ''));
  }

  onAddAnswer(i: number) {
    if (this.answersArray[i] == null) {
      this.answersArray[i] = [];
    }
    this.answersArray[i].push('');
  }

  ngOnChanges() {
    if (this.lessonEdited != null) {
      this.fillForm()
    }

  }

  fillForm() {
    this.answersArray = [];
    this.questionsArray = [];
    this.lessonEdited.questions.forEach((question, index) => {
      this.questionsArray.push(question);
      if (question.answers != null) this.answersArray[index].push(question.answers);
    });
    setTimeout(() => {
      let form = this.f.form.controls;
      console.log(form);
      form['name'].setValue(this.lessonEdited.name);
      form['type'].setValue(this.lessonEdited.type);
      form['description'].setValue(this.lessonEdited.description);
      form['lessonText'].setValue(this.lessonEdited.lesson_text);
      for (let i = 0; i < this.questionsArray.length; i++) {
        form['question' + i].setValue(this.lessonEdited.questions[i].question);
        form['type' + i].setValue(this.lessonEdited.questions[i].type);
        form['correctAnswer' + i].setValue(this.lessonEdited.questions[i].correct_answer);
        if (this.lessonEdited.questions[i].image != null) {
          form['imgURL' + i].setValue(this.lessonEdited.questions[i].image);
        }
        if (this.answersArray[i] != null) {
          for (let j = 0; j < this.answersArray[i].length; j++) {
            form['answer-' + i + '-' + j].setValue(this.lessonEdited.questions[i].answers[j]);
          }
        }
      }


    }, 250);


  }

  onSubmit(form: NgForm) {
    if (this.questionsArray.length > 0) {
      this.fewQuestions = false;
      let value = form.value;
      let name = value.name;
      let type = value.type;
      let description = value.description;
      let lessonText = value.lessonText;
      for (let i = 0; i < this.questionsArray.length; i++) {
        this.questionsArray[i].question = form.value['question' + i];
        this.questionsArray[i].type = form.value['type' + i];
        if (this.questionsArray[i].type == 'rearrange') {
          this.questionsArray[i].correct_answer = String(form.value['correctAnswer' + i]).split(',');
          console.log(String(form.value['correctAnswer' + i]).split(','));
        }
        else {
          this.questionsArray[i].correct_answer = form.value['correctAnswer' + i];
        }
        if (form.value['imgURL' + i] != null) {
          this.questionsArray[i].image = form.value['imgURL' + i];
        }
        if (this.answersArray[i] != null) {
          for (let j = 0; j < this.answersArray[i].length; j++) {
            this.answersArray[i][j] = form.value['answer-' + i + '-' + j];
            //this.questionsArray[i].answers[j]=form.value['answer-'+i+'-'+j];
          }

          this.questionsArray[i].answers = this.answersArray[i];
        }

      }

      let token = this.authService.getToken();
      let post_object = {
        'name': name,
        'description': description,
        'lesson_text': lessonText,
        'questions': this.questionsArray,
        'type': type
      };
      let lesson: Lesson = new Lesson(name, description, lessonText, this.questionsArray, type);
      this.lessonService.pendingLesson = lesson;
      this.lessonService.lessonList.forEach((e, i) => {
        if (e.name == name) {
          this.lessonService.editMode = true;
          this.lessonService.lessonChanged.next('edit');
          this.lessonService.updateLesson(lesson, i);
          console.log(this.lessonService.lessonList);
        }
      });
      if (!this.lessonService.editMode) {
        this.http.post(`https://zavrsni-rad-f80a0.firebaseio.com/lessons.json?auth=${token}`, post_object).subscribe();
        this.lessonService.lessonChanged.next('add');
      }
      this.lessonService.editMode = false;
      form.reset();
      this.questionsArray = [];
      this.answersArray = [];
    }
    else {
      this.fewQuestions = true;
    }

  }


  onDelete(type: string, index: number, subindex?: number) {
    if (type == 'question') this.questionsArray.splice(index, 1);
    else this.answersArray[subindex].splice(index, 1);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
