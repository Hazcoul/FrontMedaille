import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UtilisateursComponent} from "./utilisateurs.component";
import {CreateUpdateUtilisateurComponent} from "./create-update-utilisateur/create-update-utilisateur.component";
import {AuthGuardService} from "../../../../services/auth/auth-guard.service";

const routes: Routes = [
  {
    path:"",
    component: UtilisateursComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ADD_USER','VIEW_USER']}
  },
  {
    path:"creation",
    component: CreateUpdateUtilisateurComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ADD_USER','VIEW_USER']}
  },
  {
    path:"modification/:id",
    component: CreateUpdateUtilisateurComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ADD_USER','VIEW_USER']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
