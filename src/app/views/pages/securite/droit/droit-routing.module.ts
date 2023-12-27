import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DroitsComponent} from "./droits.component";

const routes: Routes = [
  {
    path:"",
    component: DroitsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DroitRoutingModule { }
