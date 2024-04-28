import { Component, Input } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {AuthentificationService} from "../../../services/authentification.service";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../../services/utilisateur.service";
import {IUtilisateur, Utilisateur} from "../../../entities/utilisateur.model";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  utilisateur: IUtilisateur = new Utilisateur();

  constructor(private classToggler: ClassToggleService,
              private authService: AuthentificationService,
              private utilisateurService: UtilisateurService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  logout() {
    this.authService.signOut();
  }

  getUserInfo(){
    this.utilisateurService.findUserInfo().subscribe({
      next: (result) => {
        this.utilisateur = result.body!;
      }
    });
  }

  goToProfile() {
    this.router.navigate(['pages','securite','profil-utilisateur',6]);
  }
}
