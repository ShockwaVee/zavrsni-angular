import { Question } from './question.model';

export class Lesson{
	public lesson_text: string;
	public questions: Question[];

	constructor(text, questions){
		this.lesson_text = text;
		this.questions = questions;
	}

}