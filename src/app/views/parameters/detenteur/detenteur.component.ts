import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { DetenteurService } from '../../../services/detenteur.service';
import { IDetenteur } from '../../../entities/detenteur';
import { ITEMS_PER_PAGE, NEXT_PAGE, PREV_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditDetenteurComponent } from './add-edit-detenteur/add-edit-detenteur.component';
import { cloneDeep } from 'lodash-es';
import Swal from 'sweetalert2';
import { DetailDetenteurComponent } from './detail-detenteur/detail-detenteur.component';

@Component({
  selector: 'app-detenteur',
  templateUrl: './detenteur.component.html',
  styleUrl: './detenteur.component.scss'
})
export class DetenteurComponent implements OnInit, OnDestroy {

  detenteurs?: IDetenteur[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  isLoading = false;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  nextLabel = NEXT_PAGE;
  previousLabel = PREV_PAGE;
  predicate = 'idDetenteur';
  ascending!: boolean;
  droit = "ADD_PARAM"

  constructor(
    private DetenteurService: DetenteurService,
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

  onTableDataChange(event: any) {
    this.page = event;
    this.loadPage();
  }
  onTableSizeChange(event: any): void {
    this.itemsPerPage = event.target.value;
    this.page = 1;
    this.loadPage();
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.DetenteurService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IDetenteur[]>) => {
            console.log('TOTAL_ITEMS_COUNT_FROM_RES_HEADER : ', res.headers.keys());
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(
      ([data, params]) => {
        this.loadPage();
      }
    );

  }

  trackId(index: number, item: IDetenteur): number {
    
    return item.idDetenteur!;
  }

  confirmDeleteItem(detenteur: IDetenteur) {
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
        this.delete(detenteur);
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  delete(detenteur: IDetenteur): void {
    this.DetenteurService.delete(detenteur.idDetenteur!).subscribe({
      next: (res) => {
        this.loadPage();
      },
      error: (e) => console.log('ERROR: ', e)
    })
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idDetenteur') {
      result.push('idDetenteur');
    }
    return result;
  }

  protected onSuccess(data: IDetenteur[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('x-total-count'));
    console.log('TOTAL_ITEMS =', this.totalItems);
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/detenteur'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.detenteurs = data || [];
  }

  protected onError(): void {
    this.isLoading = false;
  }

  openAddEditModal(detenteur?: IDetenteur): void {
    const modalRef = this.modalService.open(AddEditDetenteurComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != detenteur?.idDetenteur) {
      console.log('DETENTEUR TO EDIT : ',  detenteur);
      modalRef.componentInstance.detenteur = cloneDeep(detenteur);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }

  openDetailModal(detenteur: IDetenteur): void {
    const modalRef = this.modalService.open(DetailDetenteurComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detenteur = detenteur;
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }
}
