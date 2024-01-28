import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Magasin,IMagasin } from 'src/app/entities/magasin.model';
import { Depot,IDepot } from 'src/app/entities/depot.model';
import { MagasinService } from 'src/app/services/magasin.service';
import { DepotService } from 'src/app/services/depot.service';

@Component({
  selector: 'app-add-edit-magasin',
  templateUrl: './add-edit-magasin.component.html',
  styleUrl: './add-edit-magasin.component.scss'
})
export class AddEditMagasinComponent implements OnInit, OnDestroy {

  isSaving = false;
  magasin: IMagasin = new Magasin();
  depots?: IDepot[];
  selectedDepotId?: number | null;

  constructor(
    private magasinService: MagasinService,
    private activeModal: NgbActiveModal,
    private depotService: DepotService,
  ) {}

  ngOnInit(): void {

    if (this.magasin) {
      this.selectedDepotId = this.magasin.depot?.idDepot;
    }
    
      /**
     * Get all depots
     */
    this.depotService.query().subscribe({
      next: (res: HttpResponse<IDepot[]>) => {
        this.depots = res.body || [];
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
    this.magasin.depot = this.depots?.find((elem) => elem.idDepot === this.selectedDepotId);
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
