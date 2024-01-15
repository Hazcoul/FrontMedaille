import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "../../../services/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "utilisateurs",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./utilisateur/utilisateur.module").then((m) => m.UtilisateurModule),
  },
  {
    path: "profils",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "droits",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./droit/droit.module").then((m) => m.DroitModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuriteRoutingModule { }
