import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDetenteur } from 'src/app/entities/detenteur';

@Component({
  selector: 'app-detail-detenteur',
  templateUrl: './detail-detenteur.component.html',
  styleUrl: './detail-detenteur.component.scss'
})
export class DetailDetenteurComponent {

  detenteur!: IDetenteur;

  constructor(private activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }
}
