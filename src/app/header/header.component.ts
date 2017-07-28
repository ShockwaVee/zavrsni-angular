import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdmin(){
    return this.authService.admin_rights;
  }

  onLogout() {
    this.authService.logOutUser();
  }
}
