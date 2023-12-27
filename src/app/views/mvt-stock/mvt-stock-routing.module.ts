import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';
import { AddEditEntreeComponent } from './entree/add-edit-entree/add-edit-entree.component';
import { AddEditSortieComponent } from './sortie/add-edit-sortie/add-edit-sortie.component';

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
    path: 'sortie',
    component: SortieComponent
  },
  {
    path: 'sortie/nouvelle',
    component: AddEditSortieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MvtStockRoutingModule { }
