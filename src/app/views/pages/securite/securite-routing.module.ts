import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "../../../services/auth/auth-guard.service";
import {UtilisateursComponent} from "./utilisateur/utilisateurs.component";
import {UserProfilComponent} from "./user-profil/user-profil.component";

const routes: Routes = [
  {
    path: "utilisateurs",
    loadChildren: () =>
      import("./utilisateur/utilisateur.module").then((m) => m.UtilisateurModule),
  },
  {
    path: "profils",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "droits",
    loadChildren: () =>
      import("./droit/droit.module").then((m) => m.DroitModule),
  },
  {
    path:"profil-utilisateur/:id",
    component: UserProfilComponent,
    canActivate: [AuthGuardService],
    data: {roles: []}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuriteRoutingModule { }
