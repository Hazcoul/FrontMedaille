import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "../../../services/auth/auth-guard.service";

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuriteRoutingModule { }
