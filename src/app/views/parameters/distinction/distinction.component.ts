import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { DistinctionService } from '../../../services/distinction.service';
import { IDistinction} from '../../../entities/distinction.model';
import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditDistinctionComponent } from './add-edit-distinction/add-edit-distinction.component';
import { cloneDeep } from 'lodash-es';
import {Utilisateur} from "../../../entities/utilisateur.model";
import Swal from "sweetalert2";
import {IProfil} from "../../../entities/profil.model";
import {DetailProfilComponent} from "../../pages/securite/profile/detail-profil/detail-profil.component";
import {DetailDistinctionComponent} from "./detail-distinction/detail-distinction.component";

@Component({
  selector: 'app-distinction',
  templateUrl: './distinction.component.html',
  styleUrl: './distinction.component.scss'
})
export class DistinctionComponent implements OnInit, OnDestroy {

  distinctions?: IDistinction[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    private distinctionService: DistinctionService,
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

    this.distinctionService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IDistinction[]>) => {
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();
  }

  trackId(index: number, item: IDistinction): number {
    return item.idDistinction!;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IDistinction[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/distinction'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.distinctions = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  openAddEditModal(distinction?: IDistinction): void {
    const modalRef = this.modalService.open(AddEditDistinctionComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != distinction?.idDistinction) {
      modalRef.componentInstance.distinction = cloneDeep(distinction);
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

  delete(distinction: IDistinction) {
    this.distinctionService.delete(distinction.idDistinction!).subscribe(() => {
      this.loadPage();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Suppression effectuée avec succès',
        showConfirmButton: false,
        timer: 1500,
      });

    }, (error) => {
      console.error("Distinction " + JSON.stringify(error));
    });
  }

    openModalDetail(distinction: IDistinction) {
      const modalRef = this.modalService.open(DetailDistinctionComponent, { size: 'lg', backdrop: 'static' });
      if(undefined != distinction?.idDistinction) {
        modalRef.componentInstance.distinction = cloneDeep(distinction);
      }
      modalRef.result.then(() => {
          this.loadPage();
        },
        error => {
          console.log(error)
        })
    }
}
