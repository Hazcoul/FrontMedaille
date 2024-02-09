import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirme-print-etat',
  templateUrl: './confirme-print-etat.component.html',
  styleUrl: './confirme-print-etat.component.scss'
})
export class ConfirmePrintEtatComponent {

  format?: string;
  confirmeMsg!: string;

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  save(): void {
   this.activeModal.close(this.format);
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
