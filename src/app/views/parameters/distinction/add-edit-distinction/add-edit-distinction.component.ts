import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Distinction,IDistinction } from 'src/app/entities/distinction.model';
import { DistinctionService } from 'src/app/services/distinction.service';

@Component({
  selector: 'app-add-edit-distinction',
  templateUrl: './add-edit-distinction.component.html',
  styleUrl: './add-edit-distinction.component.scss'
})
export class AddEditDistinctionComponent implements OnInit, OnDestroy {

  isSaving = false;
  distinction: IDistinction = new Distinction();

  constructor(
    private distinctionService: DistinctionService,
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
    if (this.distinction?.idDistinction !== undefined) {
      this.subscribeToSaveResponse(this.distinctionService.update(this.distinction));
    } else {
      this.subscribeToSaveResponse(this.distinctionService.create(this.distinction!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDistinction>>): void {
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

  trackById(index: number, item: IDistinction): any {
    return item.idDistinction;
  }

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
