import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatistiqueRoutingModule } from './statistique-routing.module';
import { StatCommandesComponent } from './stat-commandes/stat-commandes.component';
import { StatDechargesComponent } from './stat-decharges/stat-decharges.component';
import { StateSortiesComponent } from './state-sorties/state-sorties.component';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective, FormLabelDirective, FormSelectDirective, RowComponent, TableDirective
} from "@coreui/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";
import {NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import { StateSortiesPeriodeComponent } from './state-sorties-periode/state-sorties-periode.component';


@NgModule({
  declarations: [
    StatCommandesComponent,
    StatDechargesComponent,
    StateSortiesComponent,
    StateSortiesPeriodeComponent
  ],
  imports: [
    CommonModule,
    StatistiqueRoutingModule,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    FormControlDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormsModule,
    IconDirective,
    ReactiveFormsModule,
    RowComponent,
    TableDirective,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious
  ]
})
export class StatistiqueModule { }
