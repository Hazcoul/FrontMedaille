import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { SortieService } from '../../../../services/sortie.service';
import { ILigneSortie } from 'src/app/entities/ligne-sortie.model';
import { Sortie, ISortie } from '../../../../entities/sortie.model';
import { AddEditLigneSortieComponent } from '../add-edit-ligne-sortie/add-edit-ligne-sortie.component';
import { ReferentialService } from '../../../../services/referential.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { IMagasin } from 'src/app/entities/magasin.model';
import { IOrdonnateur } from 'src/app/entities/ordonnateur.model';
import { IDetenteur } from 'src/app/entities/detenteur';
import { IBeneficiaire } from 'src/app/entities/beneficiaire.model';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';
import { DetenteurService } from 'src/app/services/detenteur.service';
import { OrdonnateurService } from 'src/app/services/ordonnateur.service';

@Component({
  selector: 'app-add-edit-sortie',
  templateUrl: './add-edit-sortie.component.html',
  styleUrl: './add-edit-sortie.component.scss'
})
export class AddEditSortieComponent implements OnInit {

  isSaving = false;
  sortie: ISortie = new Sortie();
  referentials?: any;
  magasins?: IMagasin[];
  ordonnateurs?: IOrdonnateur[];
  detenteurs?: IDetenteur[];
  beneficiaires?: IBeneficiaire[];

  constructor(
    private sortieService: SortieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private referentialService: ReferentialService,
    private magasinService: MagasinService,
    private beneficiaireService: BeneficiaireService,
    private detenteurService: DetenteurService,
    private ordonnateurService: OrdonnateurService
  ) {}

  ngOnInit(): void {

    const idSortie = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if(idSortie) {
      this.sortieService.find(idSortie).subscribe({
        next: (res: HttpResponse<ISortie>) => {
          if(res.body) {
            this.sortie = res.body
          }
        },
        error: (e) => console.log('ERROR : ', e)
      })
    }

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
     * Get all magasin
     */
    this.magasinService.query().subscribe({
      next: (res: HttpResponse<IMagasin[]>) => {
        this.magasins = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })

    /**
     * Get all beneficiaire
     */
    this.beneficiaireService.query().subscribe({
      next: (res: HttpResponse<IBeneficiaire[]>) => {
        this.beneficiaires = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
    /**
     * Get all detenteurs
     */
    this.detenteurService.query().subscribe({
      next: (res: HttpResponse<IDetenteur[]>) => {
        this.detenteurs = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
    /**
     * Get all ordonnateurs
     */
    this.ordonnateurService.query().subscribe({
      next: (res: HttpResponse<IOrdonnateur[]>) => {
        this.ordonnateurs = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
  }

  openAddEditModal(ligneSortie?: ILigneSortie): void {
    const modalRef = this.modalService.open(AddEditLigneSortieComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != ligneSortie) {
      modalRef.componentInstance.ligneSortie = cloneDeep(ligneSortie);
    }
    modalRef.result.then((res) => {
      if(undefined == this.sortie.ligneSorties){
        this.sortie.ligneSorties = [];
      }
      const foundIdxLine = this.sortie.ligneSorties!.findIndex((line)=> line.medaille?.nomComplet == res.medaille?.nomComplet);
      if (-1 != foundIdxLine) {
        this.sortie.ligneSorties!.splice(foundIdxLine, 1);
      }
      this.sortie.ligneSorties!.push(res);
    },
    error => {
      console.log(error)
    })
  }

  removeLigne(ligneSortie: ILigneSortie): boolean {
    let isRemoved = false;
    const foundIdxLine = this.sortie.ligneSorties!.findIndex((line)=> line.idLigneSortie == ligneSortie.idLigneSortie);
    if (-1 != foundIdxLine) {
      this.sortie.ligneSorties!.splice(foundIdxLine, 1);
      isRemoved = true
    }
    return isRemoved;
  }

  goBack(): void {
    this.router.navigate(['/mouvement/sortie']);
  }

  save(): void {
    this.isSaving = true;
    if (this.sortie?.idSortie !== undefined) {
      this.subscribeToSaveResponse(this.sortieService.update(this.sortie));
    } else {
      this.subscribeToSaveResponse(this.sortieService.create(this.sortie!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISortie>>): void {
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

  trackById(index: number, item: ISortie): any {
    return item.idSortie;
  }


}
