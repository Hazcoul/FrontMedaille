import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatCommandesComponent} from "./stat-commandes/stat-commandes.component";
import {StatDechargesComponent} from "./stat-decharges/stat-decharges.component";
import {StateSortiesComponent} from "./state-sorties/state-sorties.component";
import {StateSortiesPeriodeComponent} from "./state-sorties-periode/state-sorties-periode.component";

const routes: Routes = [
  {
    path: "commande",
    component: StatCommandesComponent
  },
  {
    path: "sorties/periode",
    component: StateSortiesPeriodeComponent
  },
  {
    path: "sorties",
    component: StateSortiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatistiqueRoutingModule { }
