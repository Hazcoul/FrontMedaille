import { Component } from '@angular/core';
import {Profil} from "../../../../entities/profil.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Distinction, IDistinction} from "../../../../entities/distinction.model";

@Component({
  selector: 'app-detail-distinction',
  templateUrl: './detail-distinction.component.html',
  styleUrl: './detail-distinction.component.scss'
})
export class DetailDistinctionComponent {
  distinction: IDistinction = new Distinction();
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
