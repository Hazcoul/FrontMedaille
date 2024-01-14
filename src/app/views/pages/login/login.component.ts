import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Authentification} from "../../../entities/authentification.model";
import {AuthentificationService} from "../../../services/authentification.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error= false;
  user: Authentification = new Authentification();
  constructor(private router: Router,
              private authService: AuthentificationService,) { }



  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
       this.authService.saveToken(response);
      //  console.warn(this.authService.getToken());
       this.router.navigate(['/dashboard'])
          .then(() => {
            window.location.reload();
          });
      },
      (error) => {
          console.warn("error",error);
          this.error = true;
      }
    );
  }
}
