import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UtilisateursComponent} from "./utilisateurs.component";
import {CreateUpdateUtilisateurComponent} from "./create-update-utilisateur/create-update-utilisateur.component";

const routes: Routes = [
  {
    path:"",
    component: UtilisateursComponent
  },
  {
    path:"creation",
    component: CreateUpdateUtilisateurComponent
  },
  {
    path:"modification/:id",
    component: CreateUpdateUtilisateurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
