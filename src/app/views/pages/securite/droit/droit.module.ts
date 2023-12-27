import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DroitRoutingModule } from './droit-routing.module';
import { DroitsComponent } from './droits.component';
import { CreateUpdateDroitComponent } from './create-update-droit/create-update-droit.component';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent, TableDirective
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";


@NgModule({
  declarations: [
    DroitsComponent,
    CreateUpdateDroitComponent
  ],
    imports: [
        CommonModule,
        DroitRoutingModule,
        ButtonDirective,
        CardBodyComponent,
        CardComponent,
        CardHeaderComponent,
        ColComponent,
        IconDirective,
        RowComponent,
        TableDirective
    ]
})
export class DroitModule { }
