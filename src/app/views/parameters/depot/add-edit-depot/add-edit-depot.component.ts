import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Depot,IDepot } from 'src/app/entities/depot.model';
import { DepotService } from 'src/app/services/depot.service';

@Component({
  selector: 'app-add-edit-depot',
  templateUrl: './add-edit-depot.component.html',
  styleUrl: './add-edit-depot.component.scss'
})
export class AddEditDepotComponent implements OnInit, OnDestroy {

  isSaving = false;
  depot: IDepot = new Depot();

  constructor(
    private depotService: DepotService,
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
    if (this.depot?.idDepot !== undefined) {
      this.subscribeToSaveResponse(this.depotService.update(this.depot));
    } else {
      this.subscribeToSaveResponse(this.depotService.create(this.depot!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepot>>): void {
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

  trackById(index: number, item: IDepot): any {
    return item.idDepot;
  }

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
