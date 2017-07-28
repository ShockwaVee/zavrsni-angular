import {Component, OnInit} from '@angular/core';
import {Question} from "../../../lesson/question.model";
import {NgForm} from "@angular/forms";
import {Lesson} from "../../../lesson/lesson.model";
import {Http} from "@angular/http";
import {AuthService} from "../../auth.service";
import {LessonService} from "../../../lesson.service";

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css']
})
export class LessonAddComponent implements OnInit {
  questionsArray: Array<Question> = [];
  answersArray = [];
  fewQuestions: Boolean;

  constructor(private http: Http, private authService: AuthService, private lessonService: LessonService) {
  }

  ngOnInit() {
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
        this.questionsArray[i].correct_answer = form.value['correctAnswer' + i];
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
      this.http.post(`https://zavrsni-rad-f80a0.firebaseio.com/lessons.json?auth=${token}`, post_object).subscribe();
      let lesson: Lesson = new Lesson(name, description, lessonText, this.questionsArray, type);
      this.lessonService.lessonAdded.next(lesson);
      this.lessonService.lessonList.push(lesson);
      console.log(this.lessonService.lessonList);
      console.log(lesson);
      form.reset();
    }
    else{
      this.fewQuestions = true;
    }
  }
}
