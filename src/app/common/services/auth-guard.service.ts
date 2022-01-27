import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    console.log(this.cookieService.get('user_role'));
    var role = this.cookieService.get('user_role').toLowerCase().trim();
    console.log(role);
    console.log(route.data);
    if (route.data.allowedAccess.includes(role)) {
      return true;
    } else if (
      !this.cookieService.get('user_role') ||
      !this.cookieService.get('user_email')
    ) {
      this.router.navigate(['loginsuccess']);
      console.log('correct u r are here');
      return false;
    } else {
      console.log('inside eel');
      this.router.navigate(['invalidUser']);
      return false;
    }
  }
}
