import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthentificationService} from "../services/authentification.service";
import {SessionStorageService} from "ngx-webstorage";

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: AuthentificationService,
              private sessionStorageService: SessionStorageService,
              ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const re = "api/auth/utilisateurs/signin";

      const token = sessionStorage.getItem("TOKEN_KEY");
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

    }
    return next.handle(request);
  }



}

export const AuthInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
