import {Injectable} from "@angular/core";


import {Lesson} from "./lesson/lesson.model";
import {UserService} from "./user/user.service";
import {Question} from "./lesson/question.model";
import {Http, Response} from "@angular/http";
import {Subject} from "rxjs/Subject";
import 'rxjs/Rx';

@Injectable()
export class LessonService {
  constructor(private userService: UserService, private http: Http) {
  }

  public lessonList: Lesson[];
  public listGrammar: Array<Lesson> = [];
  public listVocabulary: Array<Lesson> = [];
  public currentLessonList;
  lessonChanged = new Subject<string>();
  pendingLesson: Lesson;
  editMode: boolean;


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
    ), /*
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
     ),*/
  ];


  /*getLessonsFromDB() {
    return this.http.get(`https://zavrsni-rad-f80a0.firebaseio.com/lessons.json?auth=${this.authService.token}`).map((response: Response) => {
      const data = response.json();
      return data;
    });
  }*/

  initializeLessonList(lessonList: Array<Lesson>) {
    /*this.getLessonsFromDB().subscribe(
      (lessons: any[]) => {
        console.log(lessons);
      },
      (error) => {
        console.log(error)
      });*/
    this.setLessonList(lessonList);
    this.listGrammar = this.getLessonList('gramatika');
    this.listVocabulary = this.getLessonList('vokabular');
  }


  getLessonList(type: string) {
    this.currentLessonList = new Array<Lesson>();
    this.lessonList.forEach(lesson => {
      if (lesson.type === type) this.currentLessonList.push(lesson);
    });
    return this.currentLessonList;
  }

  getLesson(name: string) {
    let lesson: Lesson;
    this.lessonList.forEach(element => {
      if (element.name === name) lesson = element;
    });
    return lesson;
  }

  setLessonList(list: Lesson[]) {
    this.lessonList = list;
    this.lessonList.forEach((lesson) => {
      if (this.userService.current_user.getAvailableLessons().indexOf(lesson.name) != -1) lesson.available = true;
    });
  }

  updateLesson(lesson: Lesson, index: number) {
    this.lessonList[index] = lesson;
  }

  updateAvailableLessons(name: string) {
    if (this.userService.current_user.getAvailableLessons().indexOf(name) == -1) {
      let uid = this.userService.current_user.uid;
      let token = JSON.parse(window.localStorage.getItem('firebase:authUser:AIzaSyDYgOyH3PI85yE47QYAhT6ajfadRqmxKtM:[DEFAULT]')).stsTokenManager.accessToken;
      this.userService.current_user.setLesson(name);
      this.http.patch(`https://zavrsni-rad-f80a0.firebaseio.com/users/${uid}.json?auth=${token}`, '{"available_lessons": ' + JSON.stringify(this.userService.current_user.getAvailableLessons()) + '}').subscribe();
    }
  }


}
