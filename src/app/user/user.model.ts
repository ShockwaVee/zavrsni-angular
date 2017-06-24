export class User {
  public name: string;
  public challenge_points: number;
  public passed_lessons: Array<string>;


  constructor(name, passed_lessons) {
    this.name = name;
    this.passed_lessons = passed_lessons;
  }

}
