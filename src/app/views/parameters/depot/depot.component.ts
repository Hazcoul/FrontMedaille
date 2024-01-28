import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { DepotService } from '../../../services/depot.service';
import { IDepot } from '../../../entities/depot.model';
import { ITEMS_PER_PAGE, NEXT_PAGE, PREV_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditDepotComponent } from './add-edit-depot/add-edit-depot.component';
import { cloneDeep } from 'lodash-es';
import Swal from 'sweetalert2';
import { DetailDepotComponent } from './detail-depot/detail-depot.component';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrl: './depot.component.scss'
})
export class DepotComponent implements OnInit, OnDestroy {

  depots?: IDepot[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  isLoading = false;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  nextLabel = NEXT_PAGE;
  previousLabel = PREV_PAGE;
  predicate = 'idDepot';
  ascending!: boolean;

  constructor(
    private DepotService: DepotService,
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

    this.DepotService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IDepot[]>) => {
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

  trackId(index: number, item: IDepot): number {
    
    return item.idDepot!;
  }

  confirmDeleteItem(depot: IDepot) {
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
        this.delete(depot);
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  delete(depot: IDepot): void {
    this.DepotService.delete(depot.idDepot!).subscribe({
      next: (res) => {
        this.loadPage();
      },
      error: (e) => console.log('ERROR: ', e)
    })
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'iddepot') {
      result.push('idDepot');
    }
    return result;
  }

  protected onSuccess(data: IDepot[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('x-total-count'));
    console.log('TOTAL_ITEMS =', this.totalItems);
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/depot'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.depots = data || [];
  }

  protected onError(): void {
    this.isLoading = false;
  }

  openAddEditModal(depot?: IDepot): void {
    const modalRef = this.modalService.open(AddEditDepotComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != depot?.idDepot) {
      modalRef.componentInstance.depot = cloneDeep(depot);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }

  openDetailModal(depot: IDepot): void {
    const modalRef = this.modalService.open(DetailDepotComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.depot = depot;
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }
}
