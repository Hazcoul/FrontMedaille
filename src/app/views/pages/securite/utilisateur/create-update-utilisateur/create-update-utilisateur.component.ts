import { Component } from '@angular/core';
import {Profil} from "../../../../../entities/profil.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PrivilegeService} from "../../../../../services/privilege.service";
import {ProfilService} from "../../../../../services/profil.service";
import {Utilisateur} from "../../../../../entities/utilisateur.model";
import Swal from "sweetalert2";
import {UtilisateurService} from "../../../../../services/utilisateur.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-update-utilisateur',
  templateUrl: './create-update-utilisateur.component.html',
  styleUrl: './create-update-utilisateur.component.scss'
})
export class CreateUpdateUtilisateurComponent {
  profils: Profil[] = [];
  profilsSelected: string[] = [];
  utilisateur: Utilisateur = new Utilisateur();
  constructor(
    private profilService: ProfilService,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    if(userId){
      this.findUserById(userId)
    }
    if(this.utilisateur.id){
      this.profilsSelected = this.utilisateur.profils!;
    }
    this.loadAllProfils();
  }


  goBack() {
    window.history.back()
  }

  loadAllProfils(): void {
    this.profilService.query().subscribe({
      next: (result) => {
        if (result && result.body) {
          this.profils = result.body || [];
        }
      }
    });
  }

  saveOrUpdate() {
    this.utilisateur.profils = this.profilsSelected;
    console.warn("USER TO SAVE",this.utilisateur);
    if (this.utilisateur.id) {
      this.utilisateurService.update(this.utilisateur).subscribe(
        {
          next: () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Modification effectuée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            window.history.back();

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
      this.utilisateurService.create(this.utilisateur).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Enregistre effectuée avec succès lors de l'ajout",
            showConfirmButton: false,
            timer: 1500,
          });
          window.history.back();       },
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

  findUserById(userId: number) {
    this.utilisateurService.find(userId).subscribe({
      next:(result)=>{
        if(result.body){
          this.utilisateur = result.body;
        }
    }
    })
  }
}
