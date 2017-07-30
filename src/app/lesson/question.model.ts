export class Question {
  public question: string
  public type: string;
  public answers: Array<string>;
  public correct_answer: any;
  public image: string;
  public shuffled_array: Array<string>;

  constructor(question, type, correct_answer, params?: { answers?, img? }) {
    this.question = question;
    this.type = type;
    this.correct_answer = correct_answer.slice();
    if (type === 'radio') {
      this.answers = params.answers;
    }
    if (type === 'guess') {
      this.image = params.img;
    }
    if (type === 'rearrange') {
      this.shuffleArray();
    }

  }

  shuffleArray(){
    this.shuffled_array = this.correct_answer.slice();
    for (let i = this.shuffled_array.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.shuffled_array[i - 1], this.shuffled_array[j]] = [this.shuffled_array[j], this.shuffled_array[i - 1]];
    }

  }
}
