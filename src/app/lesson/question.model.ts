export class Question{
	public question: string
  public type: string;
	public answers: Array<string>;
	public correct_answer: string;

	constructor(question, type, correct_answer,  answers?){
		this.question = question;
		this.type = type;
    this.correct_answer = correct_answer;
		if (type === 'radio'){
		  this.answers = answers
    }
	}
}
