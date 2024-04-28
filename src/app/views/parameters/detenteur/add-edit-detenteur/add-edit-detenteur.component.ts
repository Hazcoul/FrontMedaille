import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Detenteur,IDetenteur } from 'src/app/entities/detenteur';
import {Beneficiaire, IBeneficiaire} from 'src/app/entities/beneficiaire.model';
import { DetenteurService } from 'src/app/services/detenteur.service';
import {BeneficiaireService} from 'src/app/services/beneficiaire.service'
import Swal from 'sweetalert2';

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
  selectedBeneficiaireIdFromSortie?: number | null;
  fromSortie = false;

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
        this.selectedBeneficiaireId = this.selectedBeneficiaireIdFromSortie;
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
        this.onSaveSuccess(res.body);
      },
      error: () => this.onSaveError()
    });
  }

  protected onSaveSuccess(detenteur: IDetenteur | null): void {
    this.isSaving = false;
    this.activeModal.close(detenteur);
    if(!this.fromSortie) {
      this.goBack();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Opération effectuée avec succès',
        showConfirmButton: false,
        timer: 3000,
      });
    }
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
