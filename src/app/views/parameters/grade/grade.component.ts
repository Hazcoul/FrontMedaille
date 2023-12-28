import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { GradeService } from '../../../services/grade.service';
import {Grade, IGrade} from '../../../entities/grade.model';
import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditGradeComponent } from './add-edit-grade/add-edit-grade.component';
import { cloneDeep } from 'lodash-es';
import {IDistinction} from "../../../entities/distinction.model";
import Swal from "sweetalert2";
import {DetailDistinctionComponent} from "../distinction/detail-distinction/detail-distinction.component";
import {DetailGradeComponent} from "./detail-grade/detail-grade.component";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrl: './grade.component.scss'
})
export class GradeComponent implements OnInit, OnDestroy {

  grades?: IGrade[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    private gradeService: GradeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
      this.handleNavigation();
  }

  ngOnDestroy(): void {
    console.log('Dans ben com, ngOnDestroy');
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.gradeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IGrade[]>) => {
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();
  }

  trackId(index: number, item: IGrade): number {
    return item.idGrade!;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IGrade[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/grade'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.grades = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  openAddEditModal(grade?: IGrade): void {
    const modalRef = this.modalService.open(AddEditGradeComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != grade?.idGrade) {
      modalRef.componentInstance.grade = cloneDeep(grade);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }

  removeDistinction(distinction: IDistinction) {
    Swal.fire({
      title: "Etes-vous vraiment sûr?",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(distinction);
      }
    });
  }

  delete(grade: Grade) {
    this.gradeService.delete(grade.idGrade!).subscribe(() => {
      this.loadPage();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Suppression effectuée avec succès',
        showConfirmButton: false,
        timer: 1500,
      });

    }, (error) => {
      console.error("Grade " + JSON.stringify(error));
    });
  }

  openModalDetail(grade: Grade) {
    const modalRef = this.modalService.open(DetailGradeComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != grade?.idGrade) {
      modalRef.componentInstance.grade = cloneDeep(grade);
    }
    modalRef.result.then(() => {
        this.loadPage();
      },
      error => {
        console.log(error)
      })
  }
}
