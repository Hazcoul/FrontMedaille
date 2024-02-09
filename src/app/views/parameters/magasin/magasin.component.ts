import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { MagasinService } from '../../../services/magasin.service';
import { IMagasin } from '../../../entities/magasin.model';
import { ITEMS_PER_PAGE, NEXT_PAGE, PREV_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditMagasinComponent } from './add-edit-magasin/add-edit-magasin.component';
import { cloneDeep } from 'lodash-es';
import Swal from 'sweetalert2';
import { DetailMagasinComponent } from './detail-magasin/detail-magasin.component';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrl: './magasin.component.scss'
})
export class MagasinComponent implements OnInit, OnDestroy {

  magasins?: IMagasin[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  isLoading = false;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  nextLabel = NEXT_PAGE;
  previousLabel = PREV_PAGE;
  predicate = 'idMagasin';
  ascending!: boolean;
  droit = "ADD_PARAM"

  constructor(
    private magasinService: MagasinService,
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

    this.magasinService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IMagasin[]>) => {
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

  trackId(index: number, item: IMagasin): number {
    
    return item.idMagasin!;
  }

  confirmDeleteItem(magasin: IMagasin) {
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
        this.delete(magasin);
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  delete(magasin: IMagasin): void {
    this.magasinService.delete(magasin.idMagasin!).subscribe({
      next: (res) => {
        this.loadPage();
      },
      error: (e) => console.log('ERROR: ', e)
    })
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idMagasin') {
      result.push('idMagasin');
    }
    return result;
  }

  protected onSuccess(data: IMagasin[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('x-total-count'));
    console.log('TOTAL_ITEMS =', this.totalItems);
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/magasin'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.magasins = data || [];
  }

  protected onError(): void {
    this.isLoading = false;
  }

  openAddEditModal(magasin?: IMagasin): void {
    const modalRef = this.modalService.open(AddEditMagasinComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != magasin?.idMagasin) {
      modalRef.componentInstance.magasin = cloneDeep(magasin);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }

  openDetailModal(magasin: IMagasin): void {
    const modalRef = this.modalService.open(DetailMagasinComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.magasin = magasin;
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }
}
