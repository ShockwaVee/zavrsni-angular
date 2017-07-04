export class User {
  public name: string;
  public challenge_points: number;
  private available_lessons: Array<string>;


  constructor(name, available_lessons) {
    available_lessons = ['Prvi', 'Drugi', 'Cetvrti'];
    /*kod sign upa budemo na bazi napravili novog usera s pripadajucim id-om, challenge points na 0 i defaultno za available lessons
    u tom slucaju ja dajem te parametre
    kod sign ina vucem podatke iz baze i predajem ih ovom konstruktoru, on onda s tim podacima inicijalizira current usera i sve kaj treba
     */
    this.name = name;
    this.available_lessons = available_lessons;
  }

  getAvailableLessons() {
    return this.available_lessons;
  }

  setLesson(lesson_name: string){
    this.available_lessons.push(lesson_name);
  }

}