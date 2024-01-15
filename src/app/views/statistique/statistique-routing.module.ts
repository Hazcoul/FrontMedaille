import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatCommandesComponent} from "./stat-commandes/stat-commandes.component";
import {StateSortiesComponent} from "./state-sorties/state-sorties.component";
import {StateSortiesPeriodeComponent} from "./state-sorties-periode/state-sorties-periode.component";
import {AuthGuardService} from "../../services/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "commande",
    component: StatCommandesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "sorties/periode",
    component: StateSortiesPeriodeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "sorties",
    component: StateSortiesComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatistiqueRoutingModule { }
