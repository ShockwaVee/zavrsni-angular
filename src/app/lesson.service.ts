import { Injectable } from "@angular/core";

import { Lesson } from "./lesson/lesson.model";

@Injectable()
export class LessonService {
	constructor() {}

	private lessonList: Lesson[];

	getLessonList(type: string) {
		let lessons: Lesson[] = new Array<Lesson>();
		this.lessonList.forEach(lesson => {
			if (lesson.type === type) lessons.push(lesson);
		});
		return lessons;
	}

	setLessonList(list: Lesson[]) {
		this.lessonList = list;
	}

	getLesson(name: string) {
		let lesson: Lesson;
		this.lessonList.forEach(element => {
			if (element.name === name) lesson = element;
		});
		return lesson;
	}
}
