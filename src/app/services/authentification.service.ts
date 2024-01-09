import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Authentification} from "../entities/authentification.model";
import {SERVER_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {Jwt} from "../entities/jwt.model";
const TOKEN_KEY = 'auth-token';

const authenticationUrl = SERVER_API_URL + 'api/auth/utilisateurs/signin';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient,private router: Router) { }

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
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    console.warn("JSON",JSON.parse(localStorage.getItem(TOKEN_KEY)!));

  }

  public getToken(): string | null {
    let token = JSON.parse(localStorage.getItem(TOKEN_KEY)!);
    console.warn("TOKEN",token);
    if(token != null){
      return token.access_token;
    }
    return null;
  }

  public  getPrivilege(): Array<any> | null {
    let privilege= JSON.parse(localStorage.getItem(TOKEN_KEY)!)
    if(privilege != null){
      privilege = privilege.additionalInfo.privileges;
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
    return jwtHelper.decodeToken(this.getToken()!);
  }

  signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['login']);
  }


  public  checkPermission(permissions: string[], perm:string[]): boolean{
    let resultat=false;
    for( let i=0; i< permissions.length; i++){
      for(let index=0; index<perm.length; index++)
        if(permissions[i]== perm[index]){
          return true;
        }
    }
    return resultat;
  }


  public static checkPermissionTest(permissions: string[], perm:string[]): boolean{
    let resultat=false;
    for( let i=0; i< permissions.length; i++){
      for(let index=0; index<perm.length; index++)
        if(permissions[i]== perm[index]){
          return true;
        }
    }
    return resultat;
  }

  public  static getPrivilegeTest(): Array<any> | null {
    let privilege= JSON.parse(localStorage.getItem(TOKEN_KEY)!)
    if(privilege != null){
      privilege = privilege.additionalInfo.privileges;
    }
    return privilege;
  }

}
