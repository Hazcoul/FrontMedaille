import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthentificationService} from "../authentification.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthentificationService, public router: Router) {}
    canActivate(): boolean {
        /*if (!this.auth.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;*/
        let status = false;
        let session = this.auth.getToken();
        let tokenExpired = this.auth.tokenIsExpired();
        if (session != null && !tokenExpired) {
            status = true;
        }
        else {
            status = false;
        }
        return status;
    }
}
