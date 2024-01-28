import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';
import { AddEditEntreeComponent } from './entree/add-edit-entree/add-edit-entree.component';
import { AddEditSortieComponent } from './sortie/add-edit-sortie/add-edit-sortie.component';
import { EntreeDetailComponent } from './entree/entree-detail/entree-detail.component';
import { SortieDetailComponent } from './sortie/sortie-detail/sortie-detail.component';
import {AuthGuardService} from "../../services/auth/auth-guard.service";
import { IEntree } from 'src/app/entities/entree.model';
import { EntreeService } from 'src/app/services/entree.service';
import { of } from 'rxjs';
import { SortieService } from 'src/app/services/sortie.service';

export const EntreeResolve: ResolveFn<IEntree | any> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('id'));
  if(id) {
    return inject(EntreeService).find(id)
  }
  return of(null);
};

export const SortieResolve: ResolveFn<IEntree | any> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('id'));
  if(id) {
    return inject(SortieService).find(id)
  }
  return of(null);
};

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
    resolve: {
      entree: EntreeResolve,
    }
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
    component: SortieDetailComponent,
    resolve: {
      sortie: SortieResolve,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MvtStockRoutingModule { }
