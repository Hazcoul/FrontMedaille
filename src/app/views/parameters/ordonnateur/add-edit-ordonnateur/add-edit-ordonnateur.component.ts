import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Ordonnateur,IOrdonnateur } from 'src/app/entities/ordonnateur.model';
import { OrdonnateurService } from 'src/app/services/ordonnateur.service';

@Component({
  selector: 'app-add-edit-ordonnateur',
  templateUrl: './add-edit-ordonnateur.component.html',
  styleUrl: './add-edit-ordonnateur.component.scss'
})
export class AddEditOrdonnateurComponent implements OnInit, OnDestroy {

  isSaving = false;
  ordonnateur: IOrdonnateur = new Ordonnateur();

  constructor(
    private ordonnateurService: OrdonnateurService,
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
    if (this.ordonnateur?.idOrdonnateur !== undefined) {
      this.subscribeToSaveResponse(this.ordonnateurService.update(this.ordonnateur));
    } else {
      this.subscribeToSaveResponse(this.ordonnateurService.create(this.ordonnateur!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdonnateur>>): void {
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

  trackById(index: number, item: IOrdonnateur): any {
    return item.idOrdonnateur;
  }

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
