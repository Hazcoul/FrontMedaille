import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rejet-entree',
  templateUrl: './rejet-entree.component.html',
  styleUrl: './rejet-entree.component.scss'
})
export class RejetEntreeComponent {
  comment?: string;
  numEntree!: string;

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
