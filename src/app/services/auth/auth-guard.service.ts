import { Injectable } from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AuthentificationService} from "../authentification.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthentificationService, public router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url } }); // go to login if not authenticated
        return false;
      }
      if (this.auth.isAuthenticated()) {
        let roles = route.data['roles'] as Array<string>;
        if (!roles || roles.length === 0 || this.auth.hasAnyAuthority(roles)) {
          return true;
        }
       this.router.navigate(['/401']);
        return false;
      }
      return true;
    }
}
