import { Component, OnInit, Input } from "@angular/core";

import { Lesson } from "../../lesson/lesson.model";

@Component({
	selector: "app-lesson-list-item",
	templateUrl: "./lesson-list-item.component.html",
	styleUrls: ["./lesson-list-item.component.css"]
})
export class LessonListItemComponent implements OnInit {
	@Input() name: string;
	@Input() lesson: Lesson;
	@Input() index: number;

	constructor() {}

	ngOnInit() {}
}
