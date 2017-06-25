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
    this.lessonList.forEach((lesson) => {
      if (this.userService.current_user.getAvailableLessons().indexOf(lesson.name) != -1) lesson.available = true;
    });

  }
}
