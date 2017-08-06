import {Injectable} from "@angular/core";
import * as firebase from "firebase";
import {Http, Headers, Response} from "@angular/http";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";
import {LessonService} from "../lesson.service";
import {Router} from "@angular/router";
import "rxjs/Rx";
import {Lesson} from "../lesson/lesson.model";
import {Question} from "../lesson/question.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
  token: string;
  uid: string;
  admin_rights: boolean;
  error_message = new Subject<string>();

  constructor(private lessonService: LessonService, private http: Http, private userService: UserService, private router: Router) {
  }

  signUpUser(email: string, password: string, name: string, surname: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
      let post_object = {
        uid: response.uid,
        name: name,
        surname: surname,
        admin_rights: false,
        available_lessons: ['izgovor', 'životinje']
      };
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        this.token = token;
        this.http.put(`https://zavrsni-rad-f80a0.firebaseio.com/users/${response.uid}.json?auth=${this.token}`, post_object).subscribe();
        this.signInUser(email, password);
      });
    }).catch((error: Error) => {
      this.error_message.next(error['code']);
    });
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(response => firebase.auth().currentUser.getIdToken().then((token: string) => {
      this.token = token;
      this.getUserFromDB(response.uid);
    })).catch(error => {
      this.error_message.next(error['code']);
    });
  }

  getToken() {
    return this.token;
  }

  logOutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.admin_rights = false;
    this.router.navigate(['/']);
  }

  getUserFromDB(uid: string) {
    const headers = new Headers({'Access-Control-Expose-Headers': 'Authorization'});
    this.http.get(`https://zavrsni-rad-f80a0.firebaseio.com/users/${uid}.json?auth=${this.token}`, {headers: headers}).subscribe((response) => {
      let lessonList: Array<Lesson> = [];
      let data = response.json();
      let name = data.name;
      let surname = data.surname;
      let available_lessons = data.available_lessons;
      this.admin_rights = data.admin_rights;
      let user = new User(name, surname, available_lessons, uid, this.admin_rights);
      this.userService.setUser(user);
      this.http.get(`https://zavrsni-rad-f80a0.firebaseio.com/lessons.json?auth=${this.token}`).map((response: Response) => {
        const data = response.json();
        return data;
      }).subscribe(
        (lessons: any[]) => {
          for (let lessonKey in lessons) {
            let key = lessonKey;
            let name = lessons[key].name;
            let description = lessons[key].description;
            let lesson_text = lessons[key].lesson_text;
            let type = lessons[key].type;
            let questions = lessons[key].questions.map((question) => {
              return new Question(question.question, question.type, question.correct_answer, {
                answers: question.answers ? question.answers : null,
                img: question.image ? question.image : null
              });
            });
            lessonList.push(new Lesson(name, description, lesson_text, questions, type, key));
          }
          this.lessonService.initializeLessonList(lessonList);
          this.router.navigate(['/gramatika']);
        },
        (error) => {
          console.log(error)
        });
    });
  }

  isAuthenticated() {
    return this.token != null;
  }


}
