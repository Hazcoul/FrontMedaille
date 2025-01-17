import { Component, OnInit } from '@angular/core';
import { ILigneSortie, LigneSortie } from 'src/app/entities/ligne-sortie.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MedailleService } from '../../../../services/medaille.service';
import { IMedaille } from 'src/app/entities/medaille.model';
import { HttpResponse } from '@angular/common/http';
import { ReferentialService } from 'src/app/services/referential.service';

@Component({
  selector: 'app-add-edit-ligne-sortie',
  templateUrl: './add-edit-ligne-sortie.component.html',
  styleUrl: './add-edit-ligne-sortie.component.scss'
})
export class AddEditLigneSortieComponent implements OnInit {

  ligneSortie: ILigneSortie = new LigneSortie();
  medailles?: IMedaille[];
  selectedMedailleId?: number | null;

  constructor(
    private activeModal: NgbActiveModal,
    private referentialService: ReferentialService
  ) {}

  ngOnInit(): void {
    this.referentialService.getMedaillesForSelect().subscribe({
      next: (res: HttpResponse<IMedaille[]>) => {
        this.medailles = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    });
  }

  save(): void {
    this.ligneSortie.medaille = this.medailles?.find((elem) => elem.idMedaille === this.selectedMedailleId);
    this.activeModal.close(this.ligneSortie);
  }

  close(): void {
    this.activeModal.dismiss();
  }

}
