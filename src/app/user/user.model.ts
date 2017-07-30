export class User {
  public name: string;
  public surname: string;
  public challenge_points: number;
  private available_lessons: Array<string>;
  public uid: string;
  public admin_rights: boolean;


  constructor(name, surname, available_lessons, uid, admin_rights) {
    this.name = name;
    this.surname = surname;
    this.available_lessons = available_lessons;
    this.uid = uid;
    this.admin_rights = admin_rights;
  }

  getAvailableLessons() {
    return this.available_lessons;
  }

  setLesson(lesson_name: string) {
    this.available_lessons.push(lesson_name);
  }

  removeLesson(lesson_name: string) {
    this.available_lessons.forEach((e, i) => {
      if (e == lesson_name) {
        this.available_lessons.splice(i, 1);
      }
    })
  }

}
