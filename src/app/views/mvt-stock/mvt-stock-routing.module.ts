import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';
import { AddEditEntreeComponent } from './entree/add-edit-entree/add-edit-entree.component';
import { AddEditSortieComponent } from './sortie/add-edit-sortie/add-edit-sortie.component';
import { EntreeDetailComponent } from './entree/entree-detail/entree-detail.component';
import { SortieDetailComponent } from './sortie/sortie-detail/sortie-detail.component';

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
    component: EntreeDetailComponent
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
