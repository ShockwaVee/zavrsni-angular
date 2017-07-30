import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ProgressService} from "./progress.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProgressGuard implements CanActivate {

  constructor(private progressService: ProgressService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
    if (this.progressService.canAccess(route.params['name'])) return true;
    else this.router.navigate([route['_urlSegment'].segments[0].path]);
  }

}
