import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Fournisseur,IFournisseur } from 'src/app/entities/fournisseur.model';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-fournisseur',
  templateUrl: './add-edit-fournisseur.component.html',
  styleUrl: './add-edit-fournisseur.component.scss'
})
export class AddEditFournisseurComponent implements OnInit, OnDestroy {

  isSaving = false;
  fournisseur: IFournisseur = new Fournisseur();

  constructor(
    private fournisseurService: FournisseurService,
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
    if (this.fournisseur?.idFournisseur !== undefined) {
      this.subscribeToSaveResponse(this.fournisseurService.update(this.fournisseur));
    } else {
      this.subscribeToSaveResponse(this.fournisseurService.create(this.fournisseur!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFournisseur>>): void {
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
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Opération effectuée avec succès',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IFournisseur): any {
    return item.idFournisseur;
  }

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
