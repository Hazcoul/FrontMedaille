import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
              private authService: AuthentificationService,
              private route: ActivatedRoute,) { }



  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
       this.authService.saveToken(response);
       this.authService.tokenDecode();
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl).then(() => {
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
