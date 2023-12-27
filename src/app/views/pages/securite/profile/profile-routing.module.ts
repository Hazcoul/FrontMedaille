import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilsComponent} from "./profils.component";
import {CreateUpdateProfilComponent} from "./create-update-profil/create-update-profil.component";

const routes: Routes = [
  {
    path:"",
    component: ProfilsComponent
  },
  {
    path:"creation",
    component: CreateUpdateProfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
