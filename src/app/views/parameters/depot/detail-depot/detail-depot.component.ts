import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDepot } from 'src/app/entities/depot.model';

@Component({
  selector: 'app-detail-depot',
  templateUrl: './detail-depot.component.html',
  styleUrl: './detail-depot.component.scss'
})
export class DetailDepotComponent {

  depot!: IDepot;

  constructor(private activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }
}
