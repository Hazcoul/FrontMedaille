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


@NgModule({
  declarations: [
    BeneficiaireComponent
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
