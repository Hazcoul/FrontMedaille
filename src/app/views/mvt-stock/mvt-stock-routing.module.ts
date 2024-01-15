import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';
import { AddEditEntreeComponent } from './entree/add-edit-entree/add-edit-entree.component';
import { AddEditSortieComponent } from './sortie/add-edit-sortie/add-edit-sortie.component';
import { EntreeDetailComponent } from './entree/entree-detail/entree-detail.component';
import { SortieDetailComponent } from './sortie/sortie-detail/sortie-detail.component';
import {AuthGuardService} from "../../services/auth/auth-guard.service";

const routes: Routes = [
  {
    path: 'entree',
    component: EntreeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'entree/nouvelle',
    component: AddEditEntreeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'entree/:id/edit',
    component: AddEditEntreeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'entree/:id/details',
    component: EntreeDetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'sortie',
    component: SortieComponent
  },
  {
    path: 'sortie/nouvelle',
    component: AddEditSortieComponent
  },
  {
    path: 'sortie/:id/edit',
    component: AddEditSortieComponent
  },
  {
    path: 'sortie/:id/details',
    component: SortieDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MvtStockRoutingModule { }
