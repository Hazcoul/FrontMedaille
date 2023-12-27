import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CreateUpdateProfilComponent } from './create-update-profil/create-update-profil.component';
import { DetailProfilComponent } from './detail-profil/detail-profil.component';
import { ProfilsComponent } from './profils.component';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent, FormControlDirective, FormLabelDirective,
    RowComponent, TableDirective
} from "@coreui/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    CreateUpdateProfilComponent,
    DetailProfilComponent,
    ProfilsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    TableDirective,
    FormControlDirective,
    FormLabelDirective,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class ProfileModule { }
