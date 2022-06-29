import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
      const role = route.data['expectedRoles'];
      const currentUser = this.auth.user$.value;
      if (currentUser){
        if (!role)
          return true;
        else {
          const ok = role.includes(currentUser.role);
          if (!ok) {
            const forbiddenInfo = route.data['forbiddenInfo'];
            if (forbiddenInfo)
              this.router.navigate(['/', 'forbidden', forbiddenInfo]);
            else
              this.router.navigate(['/', 'forbidden']);

          }
          return ok;
        }
      }
      else {
        this.router.navigate(['/', 'login']);
        return false;
      }
  }
}
