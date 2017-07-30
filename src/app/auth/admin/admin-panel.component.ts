import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LessonService} from "../../lesson.service";
import {Lesson} from "../../lesson/lesson.model";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";
import {Question} from "../../lesson/question.model";
import {Http} from "@angular/http";
import {AuthService} from "../auth.service";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  listGrammar: Array<Lesson> = [];
  listVocabulary: Array<Lesson> = [];
  addMode: boolean = false;
  lessonToEdit: Lesson;

  subscription = new Subscription();

  @ViewChild('button_add') button_add;
  @ViewChild('lesson_add') lesson_add;

  constructor(private lessonService: LessonService, private http: Http, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.subscription = this.lessonService.lessonChanged.subscribe((mode: string) => {
      if (mode == 'edit') {
        if (this.lessonService.pendingLesson.type == 'gramatika') {
          this.lessonService.listGrammar.forEach((lesson, i) => {
            if (lesson.name == this.lessonService.pendingLesson.name) {
              this.lessonService.listGrammar[i] = this.lessonService.pendingLesson;
            }
          })
        } else {
          this.lessonService.listVocabulary.forEach((lesson, i) => {
            if (lesson.name == this.lessonService.pendingLesson.name) {
              this.lessonService.listVocabulary[i] = this.lessonService.pendingLesson;
            }
          })
        }
      }
      if (mode == 'add') {
        if (this.lessonService.pendingLesson.type == 'gramatika')
          this.lessonService.listGrammar.push(this.lessonService.pendingLesson);
        else this.lessonService.listVocabulary.push(this.lessonService.pendingLesson);
        this.lessonService.lessonList.push(this.lessonService.pendingLesson);
      }
      this.listGrammar = this.lessonService.listGrammar;
      this.listVocabulary = this.lessonService.listVocabulary;
    });
    this.listGrammar = this.lessonService.listGrammar;
    this.listVocabulary = this.lessonService.listVocabulary;
  }

  onDelete(lessonName: string, lessonType: string, index: number, lessonKey: string) {
    let nextLesson: string = "";
    if (lessonType == 'gramatika') {
      if (this.lessonService.listGrammar[1] != null) nextLesson = this.lessonService.listGrammar[1].name;
      this.lessonService.listGrammar.splice(index, 1);
    } else {
      if (this.lessonService.listVocabulary[1] != null) nextLesson = this.lessonService.listVocabulary[1].name;
      this.lessonService.listVocabulary.splice(index, 1);
    }
    this.lessonService.lessonList.forEach((e, i) => {
      if (e.name == lessonName) {
        this.lessonService.lessonList.splice(i, 1);
      }
    });
    this.http.delete(`https://zavrsni-rad-f80a0.firebaseio.com/lessons/${lessonKey}.json?auth=${this.authService.token}`).subscribe();
    this.lessonService.lessonChanged.next('delete');

    if (this.userService.current_user.getAvailableLessons().indexOf(lessonName) != -1) {
      this.userService.current_user.removeLesson(lessonName);
    }
    this.http.get(`https://zavrsni-rad-f80a0.firebaseio.com/users.json?auth=${this.authService.token}`).subscribe((response) => {
      let data = response.json();
      for (var user in data) {
        if (data.hasOwnProperty(user)) {
          let lessonList = data[user].available_lessons;
          if (lessonList.indexOf(lessonName) != -1) {
            lessonList.splice(lessonList.indexOf(lessonName), 1);
            if (index == 0 && lessonList.indexOf(nextLesson) == -1 && nextLesson != "") {
              lessonList.push(nextLesson);
            }
            this.http.patch(`https://zavrsni-rad-f80a0.firebaseio.com/users/${data[user].uid}.json?auth=${this.authService.token}`, '{"available_lessons": ' + JSON.stringify(lessonList) + '}').subscribe();
          }
        }
      }
    });
  }

  onEdit(type: string, index: number) {
    if (this.addMode) {
      this.addMode = false;
      this.button_add.nativeElement.innerHTML = "Dodaj lekciju"
    }
    let lesson: Lesson;
    this.button_add.nativeElement.innerHTML = 'Poništi';
    if (type == 'gramatika')
      lesson = this.listGrammar[index];
    else lesson = this.listVocabulary[index];
    this.lessonToEdit = lesson;
    this.addMode = true;
  }

  onAdd() {
    if (!this.addMode) {
      this.addMode = true;
      this.button_add.nativeElement.innerHTML = "Poništi"
    } else {
      this.lessonToEdit = null;
      this.addMode = false;
      this.button_add.nativeElement.innerHTML = "Dodaj lekciju"
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    /*
     od tud obrisat ova svakakva nepotrebna sranja
     implementat ondelete gumbice za question i answer da ne bi bilo da neko sjebe
     dodat edit mode, da kad kliknes te ne redirecta na taj lesson nego ti loada formu s tim vrijednostima (ako bu islo)
     post requestovi idu gore, tak da jebiga, moras sa forom najt property pa onda picit dalje
     dodat select za tip questiona
     trim lowercase na tocan odgovor i ime lekcije
     malo uredit da izgleda kak bog zapoveda
     i slozit da se doda u lesson list, u serviceu dodat neku metodu koja prima lesson, tak je brijem ez
     auth guard za taj admin panel i gg, mislim da nemas vise nis, heheh
     */
  }

}
