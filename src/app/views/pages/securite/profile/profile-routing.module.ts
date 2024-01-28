import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilsComponent} from "./profils.component";
import {CreateUpdateProfilComponent} from "./create-update-profil/create-update-profil.component";
import {AuthGuardService} from "../../../../services/auth/auth-guard.service";

const routes: Routes = [
  {
    path:"",
    component: ProfilsComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ADD_USER','VIEW_USER']}
  },
  {
    path:"creation",
    component: CreateUpdateProfilComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ADD_USER','VIEW_USER']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
