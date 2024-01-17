import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';
import { AddEditEntreeComponent } from './entree/add-edit-entree/add-edit-entree.component';
import { AddEditSortieComponent } from './sortie/add-edit-sortie/add-edit-sortie.component';
import { EntreeDetailComponent } from './entree/entree-detail/entree-detail.component';
import { SortieDetailComponent } from './sortie/sortie-detail/sortie-detail.component';
import { IEntree } from 'src/app/entities/entree.model';
import { EntreeService } from 'src/app/services/entree.service';
import { mergeMap, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

export const EntreeResolve: ResolveFn<IEntree | any> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('id'));
  if(id) {
    return inject(EntreeService).find(id)
  }
  return of(null);
};
const routes: Routes = [
  {
    path: 'entree',
    component: EntreeComponent
  },
  {
    path: 'entree/nouvelle',
    component: AddEditEntreeComponent
  },
  {
    path: 'entree/:id/edit',
    component: AddEditEntreeComponent
  },
  {
    path: 'entree/:id/details',
    component: EntreeDetailComponent,
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
    component: SortieDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MvtStockRoutingModule { }
