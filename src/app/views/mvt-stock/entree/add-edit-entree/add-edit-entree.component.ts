import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { EntreeService } from '../../../../services/entree.service';
import { ILigneEntree } from 'src/app/entities/ligne-entree.model';
import { Entree, IEntree } from '../../../../entities/entree.model';
import { AddEditLigneEntreeComponent } from '../add-edit-ligne-entree/add-edit-ligne-entree.component';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-entree',
  templateUrl: './add-edit-entree.component.html',
  styleUrl: './add-edit-entree.component.scss'
})
export class AddEditEntreeComponent {

  isSaving = false;
  entree: IEntree = new Entree();

  constructor(
    private entreeService: EntreeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}


  openAddEditModal(ligneEntree?: ILigneEntree): void {
    const modalRef = this.modalService.open(AddEditLigneEntreeComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != ligneEntree?.idLigneEntree) {
      modalRef.componentInstance.ligneEntree = cloneDeep(ligneEntree);
    }
    modalRef.result.then((res) => {
      //ajouter dans le tableau des lignes
      this.entree.ligneEntrees?.push(res);
    },
    error => {
      console.log(error)
    })
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    if (this.entree?.idEntree !== undefined) {
      this.subscribeToSaveResponse(this.entreeService.update(this.entree));
    } else {
      this.subscribeToSaveResponse(this.entreeService.create(this.entree!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntree>>): void {
    result.subscribe({
      next: (res) => {
        console.log("NEXT : ", res);
        this.onSaveSuccess();
      },
      error: () => this.onSaveError()
    });
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.goBack();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IEntree): any {
    return item.idEntree;
  }

}
