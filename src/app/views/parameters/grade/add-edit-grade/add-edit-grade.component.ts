import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Grade,IGrade } from 'src/app/entities/grade.model';
import { GradeService } from 'src/app/services/grade.service';
import { ReferentialService } from 'src/app/services/referential.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-grade',
  templateUrl: './add-edit-grade.component.html',
  styleUrl: './add-edit-grade.component.scss'
})
export class AddEditGradeComponent implements OnInit, OnDestroy {

  isSaving = false;
  grade: IGrade = new Grade();
  referentials: any;
  constructor(
    private gradeService: GradeService,
    private activeModal: NgbActiveModal,
    private referentialService: ReferentialService
  ) {}

  ngOnInit(): void {

    /**
     * Get all referentials
     */
    this.referentialService.query().subscribe({
      next: (res: HttpResponse<any>) => {
        this.referentials = res.body || [];
        console.log('REFERENTIALS : ', this.referentials);
      },
      error: (e) => console.log('ERROR : ', e)
    })

  }

  ngOnDestroy(): void {

  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    console.warn("ISSAVED",this.grade);
    this.isSaving = true;
    if (this.grade?.idGrade !== undefined) {
      this.subscribeToSaveResponse(this.gradeService.update(this.grade));
    } else {
      this.subscribeToSaveResponse(this.gradeService.create(this.grade!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrade>>): void {
    result.subscribe({
      next: (res) => {
        console.log("NEXT : ", res);
        this.onSaveSuccess();
      },
      error: () => this.onSaveError()
    });
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.activeModal.close();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Opération effectuée avec succès',
      showConfirmButton: false,
      timer: 3000,
    });
    this.goBack();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IGrade): any {
    return item.idGrade;
  }

  close(): void {
    console.log("close");
    this.activeModal.dismiss();
  }

  onCodeChange($target: any): void {
    const found = this.referentials.codesGrade.find((code: any) => code.valeur == $target);
    if(-1 != found) {
      this.grade.libelle = found.libelle;
    }
  }
}
