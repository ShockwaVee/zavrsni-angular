import {Injectable} from "@angular/core";

import {Lesson} from "./lesson/lesson.model";
import {UserService} from "./user/user.service";

@Injectable()
export class LessonService {
  constructor(private userService: UserService) {
  }

  private lessonList: Lesson[];

  getLessonList(type: string) {
    let lessons: Lesson[] = new Array<Lesson>();
    this.lessonList.forEach(lesson => {
      if (lesson.type === type) lessons.push(lesson);
    });
    return lessons;
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
    if (this.userService.current_user.passed_lessons.length === 0) {
      this.getLesson('Prvi').passed = true;
    } else {
      this.lessonList.forEach((lesson) => {
        if (this.userService.current_user.passed_lessons.indexOf(lesson.name) != -1) lesson.passed = true;
      });
    }
  }
}
