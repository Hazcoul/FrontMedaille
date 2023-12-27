import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Magasin,IMagasin } from 'src/app/entities/magasin.model';
import { MagasinService } from 'src/app/services/magasin.service';

@Component({
  selector: 'app-add-edit-magasin',
  templateUrl: './add-edit-magasin.component.html',
  styleUrl: './add-edit-magasin.component.scss'
})
export class AddEditMagasinComponent implements OnInit, OnDestroy {

  isSaving = false;
  magasin: IMagasin = new Magasin();

  constructor(
    private magasinService: MagasinService,
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
    if (this.magasin?.idMagasin !== undefined) {
      this.subscribeToSaveResponse(this.magasinService.update(this.magasin));
    } else {
      this.subscribeToSaveResponse(this.magasinService.create(this.magasin!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMagasin>>): void {
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

  trackById(index: number, item: IMagasin): any {
    return item.idMagasin;
  }

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
