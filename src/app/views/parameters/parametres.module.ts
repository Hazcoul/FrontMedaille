import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  TableModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ParametresRoutingModule } from './parametres-routing.module';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { AddEditComponent } from './beneficiaire/add-edit/add-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BeneficiaireComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    ParametresRoutingModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    TableModule,
    IconModule,
    NgbModule,
    FormsModule
  ]
})
export class ParametresModule { }
