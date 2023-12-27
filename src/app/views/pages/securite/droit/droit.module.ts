import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DroitRoutingModule } from './droit-routing.module';
import { DroitsComponent } from './droits.component';
import { CreateUpdateDroitComponent } from './create-update-droit/create-update-droit.component';


@NgModule({
  declarations: [
    DroitsComponent,
    CreateUpdateDroitComponent
  ],
  imports: [
    CommonModule,
    DroitRoutingModule
  ]
})
export class DroitModule { }
