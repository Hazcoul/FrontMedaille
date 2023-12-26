import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilsComponent} from "./profils.component";

const routes: Routes = [
  {
    path:"",
    component: ProfilsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
