import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IOrdonnateur } from 'src/app/entities/ordonnateur.model';

@Component({
  selector: 'app-detail-ordonnateur',
  templateUrl: './detail-ordonnateur.component.html',
  styleUrl: './detail-ordonnateur.component.scss'
})
export class DetailOrdonnateurComponent {

  ordonnateur!: IOrdonnateur;

  constructor(private activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }
}
