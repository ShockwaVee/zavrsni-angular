export class User {
  public name: string;
  public challenge_points: number;
  public available_lessons: Array<string>;


  constructor(name, available_lessons) {
    this.name = name;
    this.available_lessons = available_lessons;
  }

}
