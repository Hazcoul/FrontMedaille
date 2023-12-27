import { Component } from '@angular/core';
import {Profil} from "../../../../../entities/profil.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfilService} from "../../../../../services/profil.service";
import {Privilege} from "../../../../../entities/privilege.model";
import {PrivilegeService} from "../../../../../services/privilege.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-update-profil',
  templateUrl: './create-update-profil.component.html',
  styleUrl: './create-update-profil.component.scss'
})
export class CreateUpdateProfilComponent {
  profil: Profil = new Profil();
  privileges: Privilege[] = [];

  privilegesSelected: Privilege[] = [];
  constructor(
    private activeModal: NgbActiveModal,
    private privilegeService: PrivilegeService,
    private profilService: ProfilService
  ) {}

  ngOnInit(): void {
    if(this.profil.id){
      this.privilegesSelected = this.profil.privilegeCollection!;
    }
    this.loadAllPrivilege();
  }
  saveOrUpdate() {
    this.profil.privilegeCollection = this.privilegesSelected;
    console.warn("PROFIL TO SAVE",this.profil);
    if (this.profil.id) {
      this.profilService.update(this.profil).subscribe(
        {
          next: () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Modification effectuée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            this.activeModal.close(true);

          },
          error: (error) => {
            console.error("error" + JSON.stringify(error));
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Une erreur est survenue',
              showConfirmButton: false,
              timer: 1500,
            });

          }
        });
    } else {
      this.profilService.create(this.profil).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Enregistre effectuée avec succès lors de l'ajout",
            showConfirmButton: false,
            timer: 1500,
          });
          this.activeModal.close(true);        },
        error: (error) => {
          console.error("error" + JSON.stringify(error));
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Une erreur est survenue lors de la modification',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  }
  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }

  loadAllPrivilege(): void {
    this.privilegeService.query().subscribe({
      next: (result) => {
        if (result && result.body) {
          this.privileges = result.body || [];
        }
      }
    });
  }
}
