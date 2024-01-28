import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-valider-entree',
  templateUrl: './valider-entree.component.html',
  styleUrl: './valider-entree.component.scss'
})
export class ValiderEntreeComponent {

  format?: string;
  numEntree!: string;

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
