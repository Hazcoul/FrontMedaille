import { Component } from '@angular/core';
import {Utilisateur} from "../../../../entities/utilisateur.model";
import {ResetPassword} from "../../../../entities/reset-password.model";
import {UtilisateurService} from "../../../../services/utilisateur.service";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../../services/authentification.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent {
  utilisateur: Utilisateur = new Utilisateur();
  resetPassword: ResetPassword = new ResetPassword();

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private authService: AuthentificationService
  ) { }


  ngOnInit(): void {
    this.getUserInfo();
  }

  updatePasswd(){
    this.utilisateurService.updatePasswd(this.resetPassword).subscribe({
      next: (result) => {
        console.warn( result.body)
        if(result.body && result.body.code == "0"){
          Swal.fire({
            title: "",
            text: result.body.msg,
            icon: "success"
          });
        }else{
          Swal.fire({
            title: "",
            text: result.body!.msg,
            icon: "error"
          });
        }
      }
    });
  }

  getUserInfo(){
    this.utilisateurService.findUserInfo().subscribe({
      next: (result) => {
        this.utilisateur = result.body!;
      }
    });
  }
}
