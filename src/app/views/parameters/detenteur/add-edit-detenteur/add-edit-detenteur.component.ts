import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Detenteur,IDetenteur } from 'src/app/entities/detenteur';
import { DetenteurService } from 'src/app/services/detenteur.service';

@Component({
  selector: 'app-add-edit-detenteur',
  templateUrl: './add-edit-detenteur.component.html',
  styleUrl: './add-edit-detenteur.component.scss'
})
export class AddEditDetenteurComponent implements OnInit, OnDestroy {

  isSaving = false;
  detenteur: IDetenteur = new Detenteur();
  civilites = ['Monsieur','Madame','Moidemoiselle'];

  constructor(
    private detenteurService: DetenteurService,
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
