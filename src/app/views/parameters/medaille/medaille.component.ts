import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedailleService } from '../../../services/medaille.service';
import {IMedaille, Medaille} from '../../../entities/medaille.model';
import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constant';
import Swal from "sweetalert2";
import {cloneDeep} from "lodash-es";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateUpdateMedailleComponent} from "./create-update-medaille/create-update-medaille.component";
import {DetailMedailleComponent} from "./detail-medaille/detail-medaille.component";

@Component({
  selector: 'app-medaille',
  templateUrl: './medaille.component.html',
  styleUrl: './medaille.component.scss'
})
export class MedailleComponent implements OnInit, OnDestroy {

  medailles?: IMedaille[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate='idMedaille';
  ascending!: boolean;
  ngbPaginationPage = 1;
  droit = "ADD_PARAM"

  constructor(
    private medailleService: MedailleService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.handleNavigation();
  }

  ngOnDestroy(): void {
    console.log('Dans ben com, ngOnDestroy');
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.medailleService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IMedaille[]>) => {
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();
  }

  trackId(index: number, item: IMedaille): number {
    return item.idMedaille!;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idMedaille') {
      result.push('idMedaille');
    }
    return result;
  }

  protected onSuccess(data: IMedaille[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/medaille'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.medailles = data || [];
    console.warn("Medailles",this.medailles);
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  openAddEditModal(medaille?: Medaille): void {
    const modalRef = this.modalService.open(CreateUpdateMedailleComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != medaille?.idMedaille) {
      modalRef.componentInstance.medaille = cloneDeep(medaille);
    }
    modalRef.result.then(() => {
        this.loadPage();
      },
      error => {
        console.log(error)
      })
  }

  openModalDetail(medaille: Medaille) {
    const modalRef = this.modalService.open(DetailMedailleComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != medaille?.idMedaille) {
      modalRef.componentInstance.medaille = cloneDeep(medaille);
    }
    modalRef.result.then(() => {
        this.loadPage();
      },
      error => {
        console.log(error)
      })
  }

  removeMedaille(medaille: Medaille) {
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
        this.delete(medaille);
      }
    });
  }

  delete(medaille: Medaille) {
    this.medailleService.delete(medaille.idMedaille!).subscribe(() => {
      this.loadPage();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Suppression effectuée avec succès',
        showConfirmButton: false,
        timer: 1500,
      });

    }, (error) => {
      console.error("medaille " + JSON.stringify(error));
    });
  }


}
