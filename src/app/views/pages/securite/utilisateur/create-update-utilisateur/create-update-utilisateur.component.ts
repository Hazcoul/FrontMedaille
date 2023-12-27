import { Component } from '@angular/core';
import {Profil} from "../../../../../entities/profil.model";

@Component({
  selector: 'app-create-update-utilisateur',
  templateUrl: './create-update-utilisateur.component.html',
  styleUrl: './create-update-utilisateur.component.scss'
})
export class CreateUpdateUtilisateurComponent {
  profils: Profil[] = [];
  profilsselected: Profil[] = [];

  goBack() {
    window.history.back()
  }
}
