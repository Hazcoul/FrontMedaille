import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-valider-sortie',
  templateUrl: './valider-sortie.component.html',
  styleUrl: './valider-sortie.component.scss'
})
export class ValiderSortieComponent {

  format?: string;
  numSortie!: string;

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
