import { Component } from '@angular/core';
import {Distinction, IDistinction} from "../../../../entities/distinction.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Grade} from "../../../../entities/grade.model";

@Component({
  selector: 'app-detail-grade',
  templateUrl: './detail-grade.component.html',
  styleUrl: './detail-grade.component.scss'
})
export class DetailGradeComponent {
  grade: Grade = new Grade();
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
