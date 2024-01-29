import { Component } from '@angular/core';
import {Medaille} from "../../../../entities/medaille.model";
import {Distinction} from "../../../../entities/distinction.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MedailleService} from "../../../../services/medaille.service";
import Swal from "sweetalert2";
import {DistinctionService} from "../../../../services/distinction.service";
import {Grade} from "../../../../entities/grade.model";
import {GradeService} from "../../../../services/grade.service";

@Component({
  selector: 'app-create-update-medaille',
  templateUrl: './create-update-medaille.component.html',
  styleUrl: './create-update-medaille.component.scss'
})
export class CreateUpdateMedailleComponent {
  medaille: Medaille = new Medaille();
  grades: Grade[] = [];
  distinctions: Distinction[]= [];
  file: File | null = null;

  constructor(
    private medailleService: MedailleService,
    private activeModal: NgbActiveModal,
    private gradeService: GradeService,
    private distinctionService: DistinctionService
  ) {}

  ngOnInit(): void {
    this.loadAllGrades();
    this.loadAlldistinctions();
  }

  saveOrUpdate() {
    if (this.medaille.idMedaille) {
      this.medailleService.updateGlobal(this.file,this.medaille).subscribe(
        {
          next: () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Modification effectuée avec succès',
              showConfirmButton: false,
              timer: 3000,
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
      this.medailleService.createMedailleWithImage(this.file,this.medaille).subscribe({
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
            title: "Une erreur est survenue lors de l'enregistrement",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  }

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      console.warn("file",file);
    }
  }


  close() {
    console.log("close");
    this.activeModal.dismiss();
  }

  loadAllGrades(): void {
    this.gradeService.query().subscribe({
      next: (result) => {
        if (result && result.body) {
        this.grades = result.body || [];
        }
      }
    });
  }

  loadAlldistinctions(): void {
    this.distinctionService.query().subscribe({
      next: (result) => {
        if (result && result.body) {
         this.distinctions = result.body || [];
        }
      }
    });
  }


  changeStatus($event: Event) {
    console.warn("statut",$event.returnValue);
  }
}
