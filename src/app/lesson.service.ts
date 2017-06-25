import {Injectable} from "@angular/core";

import {Lesson} from "./lesson/lesson.model";
import {UserService} from "./user/user.service";

@Injectable()
export class LessonService {
  constructor(private userService: UserService) {
  }

  private lessonList: Lesson[];
  public currentLessonList;

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
    if (this.userService.current_user.available_lessons.length === 0) {
      this.userService.current_user.available_lessons = ['Prvi', 'Drugi', 'Cetvrti'];
      this.getLesson('Prvi').available = true;
      this.getLesson('Drugi').available = true;
      this.getLesson('Cetvrti').available = true;
    } else {
      this.lessonList.forEach((lesson) => {
        if (this.userService.current_user.available_lessons.indexOf(lesson.name) != -1) lesson.available = true;
      });
    }
  }
}
