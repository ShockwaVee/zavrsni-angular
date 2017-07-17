import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";

@Injectable()
export class ProgressService {

  constructor(private userService: UserService) {
  }

  canAccess(param: string) {
    if (this.userService.current_user.getAvailableLessons().indexOf(param) != -1) {
      return true;
    }
    else return false;
  }


}
