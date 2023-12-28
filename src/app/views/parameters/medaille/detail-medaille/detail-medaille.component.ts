import { Component } from '@angular/core';
import {Profil} from "../../../../entities/profil.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Medaille} from "../../../../entities/medaille.model";

@Component({
  selector: 'app-detail-medaille',
  templateUrl: './detail-medaille.component.html',
  styleUrl: './detail-medaille.component.scss'
})
export class DetailMedailleComponent {
  medaille: Medaille = new Medaille();
  constructor(
      private activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
  }
  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
