import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILigneEntree, LigneEntree } from 'src/app/entities/ligne-entree.model';

@Component({
  selector: 'app-add-edit-ligne-entree',
  templateUrl: './add-edit-ligne-entree.component.html',
  styleUrl: './add-edit-ligne-entree.component.scss'
})
export class AddEditLigneEntreeComponent {

  constructor(private activeModal: NgbActiveModal) {}
  
  ligneEntree: ILigneEntree = new LigneEntree();

  save(): void {
    this.activeModal.close(this.ligneEntree);
  }

  close(): void {
    this.activeModal.dismiss();
  }

}
