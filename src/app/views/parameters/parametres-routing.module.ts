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
import {AuthGuardService} from "../../services/auth/auth-guard.service";

const routes: Routes = [
  {
    path: 'beneficiaire',
    component: BeneficiaireComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'depot',
    component: DepotComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'fournisseur',
    component: FournisseurComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'detenteur',
    component: DetenteurComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ordonnateur',
    component: OrdonnateurComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'grade',
    component: GradeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'magasin',
    component: MagasinComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'medaille',
    component: MedailleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'distinction',
    component: DistinctionComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
