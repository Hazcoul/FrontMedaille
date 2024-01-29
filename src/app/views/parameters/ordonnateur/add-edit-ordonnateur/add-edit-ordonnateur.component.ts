import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Ordonnateur,IOrdonnateur } from 'src/app/entities/ordonnateur.model';
import { OrdonnateurService } from 'src/app/services/ordonnateur.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-ordonnateur',
  templateUrl: './add-edit-ordonnateur.component.html',
  styleUrl: './add-edit-ordonnateur.component.scss'
})
export class AddEditOrdonnateurComponent implements OnInit, OnDestroy {

  isSaving = false;
  ordonnateur: IOrdonnateur = new Ordonnateur();
  civilites = ['Monsieur','Madame','Moidemoiselle'];
  valActuel? : number;

  constructor(
    private ordonnateurService: OrdonnateurService,
    private activeModal: NgbActiveModal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.ordonnateur) {
      console.log("Dans Edit ordonnateur");
      if (this.ordonnateur.actuel) {
        this.valActuel = 1;
      }else{
        this.valActuel= 0;
      }
      this.ordonnateur.debutMandat = moment(this.ordonnateur?.debutMandat).format('yyyy-MM-DD');
      this.ordonnateur.finMandat= moment(this.ordonnateur?.finMandat).format('yyyy-MM-DD');
    }
    console.log(this.ordonnateur.debutMandat)
  }

  ngOnDestroy(): void {
      
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    if (this.valActuel==1) {
      this.ordonnateur.actuel=true;
    }else{
      this.ordonnateur.actuel=false;
    }
    this.ordonnateur.finMandat = this.ordonnateur.finMandat && moment(this.ordonnateur.finMandat).isValid() ? this.ordonnateur.finMandat : null;
    console.log('ORDONNATEUR TO SAVE : ', this.ordonnateur);
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

  trackById(index: number, item: IOrdonnateur): any {
    return item.idOrdonnateur;
  }

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
