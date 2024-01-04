import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {SessionStorageService} from "ngx-webstorage";
import {AuthentificationService} from "../services/authentification.service";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private accountService: AuthentificationService,
    private $sessionStorage: SessionStorageService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401 && err.url && !err.url.includes('api/account') && this.accountService.tokenIsExpired()) {
            this.$sessionStorage.store('url', this.router.routerState.snapshot.url);
            this.accountService.signOut();
          }
        },
      })
    );
  }
}
