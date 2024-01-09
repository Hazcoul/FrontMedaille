import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IMagasin } from 'src/app/entities/magasin.model';

@Component({
  selector: 'app-detail-magasin',
  templateUrl: './detail-magasin.component.html',
  styleUrl: './detail-magasin.component.scss'
})
export class DetailMagasinComponent {

  magasin!: IMagasin;

  constructor(private activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }
}
