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
  valActuel? : string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.ordonnateur) {
      if (this.ordonnateur.actuel) {
        this.valActuel="1";
      } else {
        this.valActuel="0";
      }
    }
}

  close(): void {
    this.activeModal.close();
  }
}
