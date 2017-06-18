export class Question{
	public question: string;
	public possible_answers: Array<string>;
	public correct_answer: string;

	constructor(question, possible_answers, correct_answer){
		this.question = question;
		this. possible_answers = possible_answers;
		this.correct_answer = correct_answer;
	}
}