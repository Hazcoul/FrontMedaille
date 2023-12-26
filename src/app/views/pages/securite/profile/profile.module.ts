import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CreateUpdateProfilComponent } from './create-update-profil/create-update-profil.component';
import { DetailProfilComponent } from './detail-profil/detail-profil.component';
import { ProfilsComponent } from './profils.component';


@NgModule({
  declarations: [
    CreateUpdateProfilComponent,
    DetailProfilComponent,
    ProfilsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
