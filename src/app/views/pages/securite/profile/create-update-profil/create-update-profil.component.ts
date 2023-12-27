import { Component } from '@angular/core';
import {Profil} from "../../../../../entities/profil.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-update-profil',
  templateUrl: './create-update-profil.component.html',
  styleUrl: './create-update-profil.component.scss'
})
export class CreateUpdateProfilComponent {
  profil: Profil = new Profil();
  privileges = [
    {
      id:701,
      text:'GESTION-PARAMETRE'
    },{
      id:702,
      text:'GESTION-STOCK'
    },
  ]
  selectedBrand: any[] = [];
  constructor(
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {

  }
  save() {

  }
  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }
}
