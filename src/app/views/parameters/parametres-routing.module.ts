import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';

const routes: Routes = [
  {
    path: 'beneficiaire',
    component: BeneficiaireComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
