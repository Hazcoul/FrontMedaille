import { Component } from '@angular/core';

@Component({
  selector: 'app-create-update-utilisateur',
  templateUrl: './create-update-utilisateur.component.html',
  styleUrl: './create-update-utilisateur.component.scss'
})
export class CreateUpdateUtilisateurComponent {

  goBack() {
    window.history.back()
  }
}
