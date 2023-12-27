import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Beneficiaire, IBeneficiaire } from 'src/app/entities/beneficiaire.model';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit, OnDestroy {

  isSaving = false;
  beneficiaire: IBeneficiaire = new Beneficiaire();

  constructor(
    private beneficiaireService: BeneficiaireService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
      
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    if (this.beneficiaire?.idBeneficiaire !== undefined) {
      this.subscribeToSaveResponse(this.beneficiaireService.update(this.beneficiaire));
    } else {
      this.subscribeToSaveResponse(this.beneficiaireService.create(this.beneficiaire!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeneficiaire>>): void {
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
    // this.goBack();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBeneficiaire): any {
    return item.idBeneficiaire;
  }

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
