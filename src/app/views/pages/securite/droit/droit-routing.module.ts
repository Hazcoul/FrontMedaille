import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DroitsComponent} from "./droits.component";
import {AuthGuardService} from "../../../../services/auth/auth-guard.service";

const routes: Routes = [
  {
    path:"",
    component: DroitsComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ADMIN']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DroitRoutingModule { }
