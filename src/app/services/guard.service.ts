import { Injectable } from '@angular/core';
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private authService: AuthentificationService) { }

  public isLoggedIn(): boolean {
    let status = false;
    let session = this.authService.getToken();
    let tokenExpired = this.authService.tokenIsExpired();
    if (session != null && !tokenExpired) {
      status = true;
    }
    else {
      status = false;
    }
    return status;

  }
}
