import {Component, OnDestroy, OnInit} from '@angular/core';

import {LessonService} from '../lesson.service';
import {Lesson} from '../lesson/lesson.model';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit, OnDestroy {
  lessonList: Lesson[];
  subscription: Subscription = new Subscription;

  constructor(private lessonService: LessonService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      let re = new RegExp("vokabular|gramatika|interpunkcija");
      if (re.test(params['type'])) {
        this.lessonList = this.lessonService.getLessonList(params['type']);
      }
      else this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
