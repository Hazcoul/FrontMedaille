import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuriteRoutingModule } from './securite-routing.module';
import { UserProfilComponent } from './user-profil/user-profil.component';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective, FormLabelDirective, FormSelectDirective, RowComponent, TableDirective
} from "@coreui/angular";
import {FormsModule} from "@angular/forms";
import {NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    UserProfilComponent
  ],
  imports: [
    CommonModule,
    SecuriteRoutingModule,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    FormControlDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormsModule,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
    RowComponent,
    TableDirective
  ]
})
export class SecuriteModule { }
