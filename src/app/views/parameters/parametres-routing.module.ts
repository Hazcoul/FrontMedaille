import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { DepotComponent } from './depot/depot.component';
import { DetenteurComponent } from './detenteur/detenteur.component';
import { OrdonnateurComponent } from './ordonnateur/ordonnateur.component';
import { GradeComponent } from './grade/grade.component';
import { MagasinComponent } from './magasin/magasin.component';
import { MedailleComponent } from './medaille/medaille.component';
import { DistinctionComponent } from './distinction/distinction.component';

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
    path: 'fournisseur',
    component: FournisseurComponent
  },
  {
    path: 'detenteur',
    component: DetenteurComponent
  },
  {
    path: 'ordonnateur',
    component: OrdonnateurComponent
  },
  {
    path: 'grade',
    component: GradeComponent
  },
  {
    path: 'magasin',
    component: MagasinComponent
  },
  {
    path: 'medaille',
    component: MedailleComponent
  },
  {
    path: 'distinction',
    component: DistinctionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
