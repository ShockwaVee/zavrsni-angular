export class Question{
	public question: string
  public type: string;
	public answers: Array<string>;
	public correct_answer: any;
	public image: string;

	constructor(question, type, correct_answer, params?: {answers?, img?}){
		this.question = question;
		this.type = type;
    this.correct_answer = correct_answer;
		if (type === 'radio'){
		  this.answers = params.answers;
    }
    if (type === 'guess'){
      this.image = params.img;
    }
	}
}
