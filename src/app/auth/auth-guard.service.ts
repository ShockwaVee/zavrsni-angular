import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(){
    if (this.authService.isAuthenticated() || window.localStorage.getItem('zavrsni-rad-user')){
      this.authService.token = JSON.parse(window.localStorage.getItem('firebase:authUser:AIzaSyDYgOyH3PI85yE47QYAhT6ajfadRqmxKtM:[DEFAULT]')).stsTokenManager.accessToken;
      return true;
    }else{
      this.router.navigate(['/signin']);
    }
  }

}
