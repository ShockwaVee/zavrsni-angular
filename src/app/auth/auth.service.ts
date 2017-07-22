import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Http} from "@angular/http";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";
import {LessonService} from "../lesson.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  token: string;
  uid: string;

  constructor(private http: Http, private userService: UserService, private lessonService: LessonService, private router: Router) {
  }

  signUpUser(email: string, password: string, name: string, surname: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
      let post_object = {
        uid: response.uid,
        name: name,
        surname: surname,
        available_lessons: ['Prvi', 'izgovor', 'Cetvrti']
      };
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        this.token = token;
        this.http.put(`https://zavrsni-rad-f80a0.firebaseio.com/users/${response.uid}.json?auth=${this.token}`, post_object).subscribe();
      });
      //
    }).catch((error) => console.log(error));
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(response => firebase.auth().currentUser.getIdToken().then((token: string) => {
      this.token = token;
      this.getUserFromDB(response.uid);
    })).catch(error => console.log(error));
  }

  getToken() {
    if (window.localStorage.getItem('zavrsni-rad-user') != null){
      this.token = JSON.parse(window.localStorage.getItem('firebase:authUser:AIzaSyDYgOyH3PI85yE47QYAhT6ajfadRqmxKtM:[DEFAULT]')).stsTokenManager.accessToken;
    }else
    firebase.auth().currentUser.getIdToken().then((token: string) => {
      this.token = token;
    });
    return this.token;
  }

  logOutUser() {
    firebase.auth().signOut();
    this.token = null;
  }

  getUserFromDB(uid: string) {
    this.http.get(`https://zavrsni-rad-f80a0.firebaseio.com/users/${uid}.json?auth=${this.token}`).subscribe((response) => {
      let data = response.json();
        let name = data.name;
        let surname = data.surname;
        let available_lessons = data.available_lessons;
        let user = new User(name, surname, available_lessons, uid);
        this.userService.setUser(user);
        window.localStorage.setItem('zavrsni-rad-user', JSON.stringify(user));
        this.lessonService.initializeLessonList();
        this.router.navigate(['/gramatika']);
    });
  }

  isAuthenticated() {
    return this.token != null;
  }


}
