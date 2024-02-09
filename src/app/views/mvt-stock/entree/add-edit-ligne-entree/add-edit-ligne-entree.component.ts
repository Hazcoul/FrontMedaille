import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILigneEntree, LigneEntree } from 'src/app/entities/ligne-entree.model';
import { IMedaille } from 'src/app/entities/medaille.model';
import { HttpResponse } from '@angular/common/http';
import { ReferentialService } from 'src/app/services/referential.service';

@Component({
  selector: 'app-add-edit-ligne-entree',
  templateUrl: './add-edit-ligne-entree.component.html',
  styleUrl: './add-edit-ligne-entree.component.scss'
})
export class AddEditLigneEntreeComponent implements OnInit {

  ligneEntree: ILigneEntree = new LigneEntree();
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
    this.ligneEntree.medaille = this.medailles?.find((elem) => elem.idMedaille === this.selectedMedailleId);
    this.activeModal.close(this.ligneEntree);
  }

  close(): void {
    this.activeModal.dismiss();
  }

  calculerMontant($event: any): void {
    console.log('calcul...', $event)
    if(undefined != this.ligneEntree.prixUnitaire  && undefined != this.ligneEntree.quantiteLigne)
      this.ligneEntree.montantLigne = this.ligneEntree.prixUnitaire * this.ligneEntree.quantiteLigne;
  }

}
