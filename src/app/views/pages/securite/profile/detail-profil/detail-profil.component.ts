import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PrivilegeService} from "../../../../../services/privilege.service";
import {ProfilService} from "../../../../../services/profil.service";
import {Profil} from "../../../../../entities/profil.model";

@Component({
  selector: 'app-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrl: './detail-profil.component.scss'
})
export class DetailProfilComponent {
  profil: Profil = new Profil();
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
