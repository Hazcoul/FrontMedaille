import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { DepotComponent } from './depot/depot.component';
import { DetenteurComponent } from './detenteur/detenteur.component';
import { OrdonnateurComponent } from './ordonnateur/ordonnateur.component';

const routes: Routes = [
  {
    path: 'beneficiaire',
    component: BeneficiaireComponent
  },
  {
    path: 'depot',
    component: DepotComponent
  },
  {
    path: 'detenteur',
    component: DetenteurComponent
  },
  {
    path: 'ordonnateur',
    component: OrdonnateurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
