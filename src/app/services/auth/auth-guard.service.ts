import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthentificationService} from "../authentification.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthentificationService, public router: Router) {}
    canActivate(): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/login']); // go to login if not authenticated
        return false;
      }
      return true;
    }
}
