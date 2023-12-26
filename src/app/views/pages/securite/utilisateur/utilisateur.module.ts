import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateursComponent } from './utilisateurs.component';
import { CreateUpdateUtilisateurComponent } from './create-update-utilisateur/create-update-utilisateur.component';
import { DetailUtilisateurComponent } from './detail-utilisateur/detail-utilisateur.component';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent, TableDirective
} from "@coreui/angular";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UtilisateursComponent,
    CreateUpdateUtilisateurComponent,
    DetailUtilisateurComponent
  ],
    imports: [
        CommonModule,
        UtilisateurRoutingModule,
        ButtonDirective,
        CardBodyComponent,
        CardComponent,
        CardHeaderComponent,
        ColComponent,
        RowComponent,
        TableDirective,
        FormsModule
    ]
})
export class UtilisateurModule { }
