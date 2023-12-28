import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBeneficiaire } from 'src/app/entities/beneficiaire.model';

@Component({
  selector: 'app-detail-beneficiaire',
  templateUrl: './detail-beneficiaire.component.html',
  styleUrl: './detail-beneficiaire.component.scss'
})
export class DetailBeneficiaireComponent {

  beneficiaire!: IBeneficiaire;

  constructor(private activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }
}
