import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Authentification} from "../entities/authentification.model";
import {SERVER_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {Jwt} from "../entities/jwt.model";
import {SessionStorageService} from "ngx-webstorage";
const TOKEN_KEY = 'auth-token';

const authenticationUrl = SERVER_API_URL + 'api/auth/utilisateurs/signin';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient,
              private sessionStorage: SessionStorageService,
              private router: Router,
  ) { }

  login(request: Authentification): Observable<Jwt> {
    return this.http.post(authenticationUrl, request);
  }



  tokenIsExpired(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    if(token != null){
      const tokenExpired = jwtHelper.isTokenExpired(token);
      return tokenExpired;
    }
    return true;
  }

  public saveToken(token: any): void {
    sessionStorage.setItem('TOKEN_KEY', token.accessToken!);
  }

  public getToken(): string | null {
    return sessionStorage.getItem("TOKEN_KEY");
  }

  public  getPrivilege(): string {
    let privilege= sessionStorage.getItem("TOKEN_KEY")!;
    if(privilege != null){
      console.warn("PR",privilege);
    }
    return privilege;
  }

  public  getUsername(): String | null {
    let user= JSON.parse(localStorage.getItem(TOKEN_KEY)!)
    if(user != null){
      user = user.additionalInfo.username;
    }
    return user;
  }

  public tokenDecode() : any {
    const jwtHelper = new JwtHelperService();
    const tokenDecode = jwtHelper.decodeToken(this.getToken()!);
    sessionStorage.setItem('USER_ROLES', tokenDecode.roles);
    console.warn("USER ROLES",sessionStorage.getItem('USER_ROLES'));
    return jwtHelper.decodeToken(this.getToken()!);
  }

  signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem("TOKEN_KEY");
    return !this.jwtHelper.isTokenExpired(token);
  }


  public  static getPrivilegeTest(): Array<any> | null {
    let privilege= JSON.parse(localStorage.getItem(TOKEN_KEY)!)
    if(privilege != null){
      privilege = privilege.additionalInfo.privileges;
    }
    return privilege;
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    const roles = this.tokenDecode().roles as string[];
    if (!roles) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return roles.some((authority: string) => authorities.includes(authority));
  }

}
