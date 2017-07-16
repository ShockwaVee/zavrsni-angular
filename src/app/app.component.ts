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
      'Rasporedi dijelove rečenice da tvore smislenu cjelinu.',
      "rearrange",
      ['jeg', 'elsker', 'et eple'],
    ),
    new Question(
      'Na norveškom upiši što je prikazano na slici',
      "guess",
      "smørbrød",
      {img: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/BLT_sandwich_on_toast.jpg'},
    ),
    new Question(
      "Kako se kaže životinja na norveškom",
      "hangman",
      ['d', 'd', 'y', 'r'],
    ),
    new Question(
      "U koju skupinu slova spadaju slova Æ, Ø i Å?",
      "radio",
      "samoglasnici",
      {answers: ["Samoglasnici", "Suglasnici", "Niti jednu od navedenih"]},
    ),
    new Question(
      "Koju varijantu norveškog jezika ćemo učiti?",
      "radio",
      "bokmål",
      {answers: ["Riksmål", "Nynorsk", "Bokmål", "Neunorsk"]}
    ),
    new Question(
      "Navedi jedan novi glas koji se pojavljuje u norveškom.",
      "input",
      "^[åøæ]{1}$"
    ),
  ];

  user: User = new User('Marko', []);

  initializeLessonList() {
    this.lessonService.setLessonList([
      new Lesson(
        "izgovor",
        "Nauči kako izgovarati norveška slova",
        `<div class='col-xs-12'><p>U Norveškoj su najkorištenije dvije vrste norveškog jezika, a to su bokmål i nynorsk. Mi ćemo učiti bokmål varijantu (knjiški jezik) jer je rasprostranjeniji.</p>
          <p>U ovoj lekciji upoznat ćeš se s norveškom abecedom. </p>
          <p>Norveška je abeceda vrlo slična engleskoj abecedi, no ima nekoliko glasova koje ne viđamo niti u hrvatskom niti u engleskom jeziku. <br>

          Vrlo je bitno naučiti kako se izgovaraju sva slova jer postoje razne iznimke koje utječu na to kako će riječ zvučati.</p>

          <p>Norveška abeceda izgleda ovako:</p>
          <h2 class="text-center">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z Æ Ø Å</h2>
          <br>
          <p>Na kraju vidimo 3 slova koji ti vjerojatno nisu poznati, a to su:</p>
          <ul>
            <li><span class="pronounce">æ</span> (<span class="pronounce">bære</span>)</li>
            <li><span class="pronounce">ø</span> (<span class="pronounce">brød</span>)</li>
            <li><span class="pronounce">å</span> (<span class="pronounce">går</span>)</li>
          </ul>
          <p class="help-block">Možeš kliknuti na riječ ili slovo kako bi čuo izgovor riječi.</p>
          <br>
          <p>Ta su tri slova, u norveškom jeziku, samoglasnici. <br>
          Ostali samoglasnici su a, e, i, o, u i y. Sva ostala slova su suglasnici.</p>
          <br>
          <p>U nastavku ćeš naučiti i riječi s tim slovima, ali i iznimke kod izgovaranja određenih kombinacija slova.</p>

          <p class="text-center help-block">Klikni ovdje kako bi pristupio kvizu.</p>
        </div>`,
        this.questions,
        "gramatika"
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
        this.questions,
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

    /*memory i neka vrsta hangmana je u bookmarku
    jos treba slozit nekaj kao da ti pokaze sliku i ti napises nekaj pa kao, to je to
    nakon tih svih, uredit sve malo da izgleda vise interaktivno i denja*/
  }
}
