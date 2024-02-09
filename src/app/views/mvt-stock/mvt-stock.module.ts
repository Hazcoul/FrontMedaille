import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  TableModule,
  AlertModule,
  BadgeModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MvtStockRoutingModule } from './mvt-stock-routing.module';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';
import { AddEditSortieComponent } from './sortie/add-edit-sortie/add-edit-sortie.component';
import { AddEditEntreeComponent } from './entree/add-edit-entree/add-edit-entree.component';
import { AddEditLigneEntreeComponent } from './entree/add-edit-ligne-entree/add-edit-ligne-entree.component';
import { AddEditLigneSortieComponent } from './sortie/add-edit-ligne-sortie/add-edit-ligne-sortie.component';
import { EntreeDetailComponent } from './entree/entree-detail/entree-detail.component';
import { SortieDetailComponent } from './sortie/sortie-detail/sortie-detail.component';
import {HasAnyAuthorityDirective} from "../../shared/directive/has-any-authority.directive";
import { RejetEntreeComponent } from './entree/rejet-entree/rejet-entree.component';
import { ValiderEntreeComponent } from './entree/valider-entree/valider-entree.component';
import { ValiderSortieComponent } from './sortie/valider-sortie/valider-sortie.component';
import { RejeterSortieComponent } from './sortie/rejeter-sortie/rejeter-sortie.component';
import { AddEditPjComponent } from './add-edit-pj/add-edit-pj.component';


@NgModule({
  declarations: [
    EntreeComponent,
    SortieComponent,
    AddEditSortieComponent,
    AddEditEntreeComponent,
    AddEditLigneEntreeComponent,
    AddEditLigneSortieComponent,
    EntreeDetailComponent,
    SortieDetailComponent,
    RejetEntreeComponent,
    ValiderEntreeComponent,
    ValiderSortieComponent,
    RejeterSortieComponent,
    AddEditPjComponent
  ],
    imports: [
        CommonModule,
        MvtStockRoutingModule,
        ButtonModule,
        CardModule,
        FormModule,
        GridModule,
        TableModule,
        IconModule,
        NgbModule,
        NgbNavModule,
        FormsModule,
        AlertModule,
        NgxPaginationModule,
        HasAnyAuthorityDirective,
      BadgeModule
    ]
})
export class MvtStockModule { }
