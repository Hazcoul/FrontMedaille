import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';

import { ParametresRoutingModule } from './parametres-routing.module';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { DetenteurComponent } from './detenteur/detenteur.component';
import { DepotComponent } from './depot/depot.component';
import { DistinctionComponent } from './distinction/distinction.component';
import { OrdonnateurComponent } from './ordonnateur/ordonnateur.component';


@NgModule({
  declarations: [
    BeneficiaireComponent,
    DetenteurComponent,
    DepotComponent,
    DistinctionComponent,
    OrdonnateurComponent
  ],
  imports: [
    CommonModule,
    ParametresRoutingModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule
  ]
})
export class ParametresModule { }
