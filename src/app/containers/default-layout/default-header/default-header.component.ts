import { Component, Input } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {AuthentificationService} from "../../../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
              private authService: AuthentificationService,
              private router: Router) {
    super();
  }

  logout() {
    this.authService.signOut();
  }

  goToProfile() {
    this.router.navigate(['pages','securite','profil-utilisateur',6]);
  }
}
