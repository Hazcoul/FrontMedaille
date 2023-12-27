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
import { AddEditDepotComponent } from './depot/add-edit-depot/add-edit-depot.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DetenteurComponent } from './detenteur/detenteur.component';
import { AddEditDetenteurComponent } from './detenteur/add-edit-detenteur/add-edit-detenteur.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { DepotComponent } from './depot/depot.component';
import { DistinctionComponent } from './distinction/distinction.component';
import { OrdonnateurComponent } from './ordonnateur/ordonnateur.component';
import { GradeComponent } from './grade/grade.component';
import { MagasinComponent } from './magasin/magasin.component';
import { MedailleComponent } from './medaille/medaille.component';
import { AddEditDistinctionComponent } from './distinction/add-edit-distinction/add-edit-distinction.component';



@NgModule({
  declarations: [
    BeneficiaireComponent,
    AddEditComponent,
    DetenteurComponent,
    AddEditDetenteurComponent,
    DepotComponent,
    AddEditDepotComponent,
    DistinctionComponent,
    OrdonnateurComponent,
    GradeComponent,
    MagasinComponent,
    MedailleComponent,
    FournisseurComponent,
    AddEditDetenteurComponent,
    AddEditDistinctionComponent
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
