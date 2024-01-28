import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Detenteur,IDetenteur } from 'src/app/entities/detenteur';
import {Beneficiaire, IBeneficiaire} from 'src/app/entities/beneficiaire.model';
import { DetenteurService } from 'src/app/services/detenteur.service';
import {BeneficiaireService} from 'src/app/services/beneficiaire.service'

@Component({
  selector: 'app-add-edit-detenteur',
  templateUrl: './add-edit-detenteur.component.html',
  styleUrl: './add-edit-detenteur.component.scss'
})
export class AddEditDetenteurComponent implements OnInit, OnDestroy {

  isSaving = false;
  detenteur: IDetenteur = new Detenteur();
  civilites = ['Monsieur','Madame','Moidemoiselle'];
  beneficiaires?: IBeneficiaire[];
  selectedBeneficiaireId?: number | null;

  constructor(
    private detenteurService: DetenteurService,
    private activeModal: NgbActiveModal,
    private activatedRoute: ActivatedRoute,
    private beneficiaireService:BeneficiaireService
  ) {}

  ngOnInit(): void {
    
    if (this.detenteur) {
      this.selectedBeneficiaireId = this.detenteur.beneficiaire?.idBeneficiaire;
      console.log('dans edit et detenteur : ', this.detenteur);  
    }
    
       /**
     * Get all depots
     */
    this.beneficiaireService.query().subscribe({
      next: (res: HttpResponse<IBeneficiaire[]>) => {
        this.beneficiaires = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
  }

  ngOnDestroy(): void {
      
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    this.detenteur.beneficiaire = this.beneficiaires?.find((elem) => elem.idBeneficiaire === this.selectedBeneficiaireId);
    this.isSaving = true;
    console.log(this.detenteur);
    if (this.detenteur?.idDetenteur !== undefined) {
      this.subscribeToSaveResponse(this.detenteurService.update(this.detenteur));
    } else {
      this.subscribeToSaveResponse(this.detenteurService.create(this.detenteur!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetenteur>>): void {
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
    this.activeModal.close();
    this.goBack();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDetenteur): any {
    return item.idDetenteur;
  }

  

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
