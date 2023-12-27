import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { EntreeService } from '../../../../services/entree.service';
import { ILigneEntree } from 'src/app/entities/ligne-entree.model';
import { Entree, IEntree } from '../../../../entities/entree.model';
import { AddEditLigneEntreeComponent } from '../add-edit-ligne-entree/add-edit-ligne-entree.component';
import { ReferentialService } from '../../../../services/referential.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { IFournisseur } from 'src/app/entities/fournisseur.model';
import { IMagasin } from 'src/app/entities/magasin.model';

@Component({
  selector: 'app-add-edit-entree',
  templateUrl: './add-edit-entree.component.html',
  styleUrl: './add-edit-entree.component.scss'
})
export class AddEditEntreeComponent implements OnInit {

  isSaving = false;
  entree: IEntree = new Entree();
  referentials?: any;
  fournisseurs?: IFournisseur[];
  magasins?: IMagasin[];

  constructor(
    private entreeService: EntreeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private referentialService: ReferentialService,
    private fournisseurService: FournisseurService,
    private magasinService: MagasinService
  ) {}

  ngOnInit(): void {
    /**
     * Get all referentials
     */
    this.referentialService.query().subscribe({
      next: (res: HttpResponse<any>) => {
        this.referentials = res.body || [];
        console.log('REFERENTIALS : ', this.referentials);
      },
      error: (e) => console.log('ERROR : ', e)
    })

    /**
     * Get all fournisseurs
     */
    this.fournisseurService.query().subscribe({
      next: (res: HttpResponse<IFournisseur[]>) => {
        this.fournisseurs = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })

    /**
     * Get all magasin
     */
    this.magasinService.query().subscribe({
      next: (res: HttpResponse<IMagasin[]>) => {
        this.magasins = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
  }

  openAddEditModal(ligneEntree?: ILigneEntree): void {
    const modalRef = this.modalService.open(AddEditLigneEntreeComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != ligneEntree) {
      modalRef.componentInstance.ligneEntree = cloneDeep(ligneEntree);
    }
    modalRef.result.then((res) => {
      if(undefined == this.entree.ligneEntrees){
        this.entree.ligneEntrees = [];
      }
      const foundIdxLine = this.entree.ligneEntrees!.findIndex((line)=> line.medaille?.nomComplet == res.medaille?.nomComplet);
      if (-1 != foundIdxLine) {
        this.entree.ligneEntrees!.splice(foundIdxLine, 1);
      }
      this.entree.ligneEntrees!.push(res);
    },
    error => {
      console.log(error)
    })
  }

  removeLigne(ligneEntree: ILigneEntree): boolean {
    let isRemoved = false;
    const foundIdxLine = this.entree.ligneEntrees!.findIndex((line)=> line.idLigneEntree == ligneEntree.idLigneEntree);
    if (-1 != foundIdxLine) {
      this.entree.ligneEntrees!.splice(foundIdxLine, 1);
      isRemoved = true
    }
    return isRemoved;
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
