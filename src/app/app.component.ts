import {Component, OnInit} from "@angular/core";
import * as firebase from 'firebase';
import {AuthService} from "./auth/auth.service";
import {User} from "./user/user.model";
import {UserService} from "./user/user.service";
import {LessonService} from "./lesson.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private lessonService: LessonService) {
  }


  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDYgOyH3PI85yE47QYAhT6ajfadRqmxKtM",
      authDomain: "zavrsni-rad-f80a0.firebaseapp.com",
    });
    if (window.localStorage.getItem('zavrsni-rad-user') != null){
      let data = JSON.parse(window.localStorage.getItem('zavrsni-rad-user'));
      let user = new User(data.name, data.surname, data.available_lessons, data.uid);
      this.userService.setUser(user);
      this.lessonService.initializeLessonList();
    }
    /*inicijalizaciju obavezno premjestiti jer nema smisla da bude tu, mozda se nit ne bude ulogiral
     prilikom logina settat lesson list
     u biti ne, ako je vec ulogiran onda kurac
     u lesson listu mora bit inicijalizacija jer se bude to uvijek loadalo
     ako nis, if ovo nije prazno, onda napuni lesson list cijeli
     */

    /*
     dodat neki lesson html pa videt jel bude to delalo as intended, bar za prvu samo, ako nis
     doradit boje i ostalo kaj treba, layout za sad oke (animacije i to bude trebalo resit, al to zadnje)
     napravit da vuce i salje sranja na bazu jer yolo
     */

    /*memory i neka vrsta hangmana je u bookmarku
     jos treba slozit nekaj kao da ti pokaze sliku i ti napises nekaj pa kao, to je to
     nakon tih svih, uredit sve malo da izgleda vise interaktivno i denja*/
  }
}
