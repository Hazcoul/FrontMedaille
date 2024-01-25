import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rejeter-sortie',
  templateUrl: './rejeter-sortie.component.html',
  styleUrl: './rejeter-sortie.component.scss'
})
export class RejeterSortieComponent {

  comment?: string;
  numSortie!: string;

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  save(): void {
   this.activeModal.close(this.comment);
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
