import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IFournisseur } from 'src/app/entities/fournisseur.model';

@Component({
  selector: 'app-detail-fournisseur',
  templateUrl: './detail-fournisseur.component.html',
  styleUrl: './detail-fournisseur.component.scss'
})
export class DetailFournisseurComponent {

  fournisseur!: IFournisseur;
  valActuel? : string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close();
  }
}
