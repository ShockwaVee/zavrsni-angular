import {Component, OnInit} from "@angular/core";

import {Lesson} from "./lesson/lesson.model";
import {Question} from "./lesson/question.model";
import {LessonService} from "./lesson.service";
import {User} from "./user/user.model";
import {UserService} from "./user/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private lessonService: LessonService, private userService: UserService) {
  }

  questions: Question[] = [
    new Question(
      "Prvo pitanje?",
      ["odgovor1", "odgovor2", "odgovor3", "odgovor4"],
      "odgovor3"
    ),
    new Question(
      "Drugo pitanje?",
      ["odgovor1", "odgovor2", "odgovor3", "odgovor4"],
      "odgovor1"
    )
  ];
  questions1: Question[] = [
    new Question(
      "Trece pitanje?",
      ["odgovor1", "odgovor2", "odgovor3", "odgovor4"],
      "odgovor3"
    ),
    new Question(
      "Cetvrto pitanje?",
      ["odgovor1", "odgovor2", "odgovor3", "odgovor4"],
      "odgovor1"
    )
  ];

  user: User = new User('Marko', []);

  initializeLessonList() {
    this.lessonService.setLessonList([
      new Lesson(
        "Prvi",
        "Opis prvog lessona",
        "<div class='col-xs-12'><p class='text-center'> This is a <b>lesson</b> </p></div>",
        this.questions,
        "vokabular"
      ),
      new Lesson(
        "Drugi",
        "Opis drugi lessona",
        "nema random sranja",
        this.questions,
        "gramatika"
      ),
      new Lesson(
        "Treci",
        "Opis treceg lessona",
        "nema random sranja",
        this.questions1,
        "vokabular"
      ),
      new Lesson(
        "Cetvrti",
        "Opis cetvrtog lessona",
        "nema random sranja",
        this.questions,
        "interpunkcija"
      ),
      new Lesson(
        "Peti",
        "Opis petog lessona",
        "nema random sranja",
        this.questions,
        "gramatika"
      ),
      new Lesson(
        "Sesti",
        "Opis sestog lessona",
        "nema random sranja",
        this.questions,
        "gramatika"
      ),
      new Lesson(
        "Sedmi",
        "Opis sedmog lessona",
        "nema random sranja",
        this.questions,
        "vokabular"
      ),
      new Lesson(
        "Osmi",
        "Opis osmog lessona",
        "nema random sranja",
        this.questions,
        "interpunkcija"
      ),
      new Lesson(
        "Deveti",
        "Opis devetog lessona",
        "nema random sranja",
        this.questions,
        "vokabular"
      )
    ]);
  }

  ngOnInit() {
    this.userService.setUser(this.user);
    this.initializeLessonList();
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
  }
}
