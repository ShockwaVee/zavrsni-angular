import { Component, OnInit } from "@angular/core";

import { Lesson } from "./lesson/lesson.model";
import { Question } from "./lesson/question.model";
import { LessonService } from "./lesson.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
	constructor(private lessonService: LessonService) {}
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

	initializeLessonList() {
		this.lessonService.setLessonList([
			new Lesson(
				"Prvi",
				"Opis prvog lessona",
				"Ovo je neki testni tekst lessona",
				this.questions,
				"vocabulary"
			),
			new Lesson(
				"Drugi",
				"Opis drugi lessona",
				"nema random sranja",
				this.questions,
				"grammar"
			),
			new Lesson(
				"Treci",
				"Opis treceg lessona",
				"nema random sranja",
				this.questions,
				"vocabulary"
			),
			new Lesson(
				"Cetvrti",
				"Opis cetvrtog lessona",
				"nema random sranja",
				this.questions,
				"punctuation"
			),
			new Lesson(
				"Peti",
				"Opis petog lessona",
				"nema random sranja",
				this.questions,
				"grammar"
			)
		]);
	}

	ngOnInit() {
		this.initializeLessonList();
	}
}
