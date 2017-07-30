import { Question } from './question.model';

export class Lesson{
  public key: string;
	public name: string;
	public description: string;
	public lesson_text: string;
	public questions: Question[];
	public type: string;
	public available: boolean = false;

	constructor(name, description, text, questions, type, key?){
		this.name = name;
		this.description = description;
		this.lesson_text = text;
		this.questions = questions;
		this.type = type;
		if (key){
		  this.key = key;
    }
	}

}
