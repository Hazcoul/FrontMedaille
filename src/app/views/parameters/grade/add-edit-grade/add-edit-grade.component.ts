import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Grade,IGrade } from 'src/app/entities/grade.model';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-add-edit-grade',
  templateUrl: './add-edit-grade.component.html',
  styleUrl: './add-edit-grade.component.scss'
})
export class AddEditGradeComponent implements OnInit, OnDestroy {

  isSaving = false;
  grade: IGrade = new Grade();

  constructor(
    private gradeService: GradeService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
      
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
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
}
