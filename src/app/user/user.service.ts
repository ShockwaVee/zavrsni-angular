import {Injectable} from "@angular/core";
import {User} from "./user.model";

@Injectable()
export class UserService {
  current_user: User;

  constructor() {
  }

  setUser(user: User) {
    this.current_user = user;
  }

  isAdmin() {
    return this.current_user.admin_rights;
  }

}
