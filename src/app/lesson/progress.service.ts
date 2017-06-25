import { Injectable } from '@angular/core';
import {UserService} from "../user/user.service";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class ProgressService {

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  canAccess(param: string){
    if(this.userService.current_user.available_lessons.indexOf(param) != -1) return true;
    else return false;
  }


}
