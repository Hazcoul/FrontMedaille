import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { SortieService } from '../../../services/sortie.service';
import { ISortie, Sortie } from '../../../entities/sortie.model'
import { AddEditLigneSortieComponent } from './add-edit-ligne-sortie/add-edit-ligne-sortie.component';
import { ILigneSortie } from 'src/app/entities/ligne-sortie.model';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrl: './sortie.component.scss'
})
export class SortieComponent implements OnInit, OnDestroy {

  sorties?: ISortie[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  sortie: ISortie = new Sortie();

  constructor(
    private sortieService: SortieService,
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

    this.sortieService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<ISortie[]>) => {
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();
    // combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
    //   const page = params.get('page');
    //   const pageNumber = page !== null ? +page : 1;
    //   const sort = (params.get('sort') ?? data['defaultSort']).split(',');
    //   const predicate = sort[0];
    //   const ascending = sort[1] === 'asc';
    //   if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
    //     this.predicate = predicate;
    //     this.ascending = ascending;
    //     this.loadPage(pageNumber, true);
    //   }
    // }).subscribe();
    
  }

  trackId(index: number, item: ISortie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.idSortie!;
  }

  // registerChangeInbeneficiaires(): void {
  //   this.eventSubscriber = this.eventManager.subscribe('beneficiairesListModification', () => this.loadPage());
  // }

  // delete(beneficiaires: ISortie): void {
  //   const modalRef = this.modalService.open(beneficiaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.beneficiaires = beneficiaires;
  // }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idSortie') {
      result.push('idSortie');
    }
    return result;
  }

  protected onSuccess(data: ISortie[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/mouvement/sortie'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.sorties = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  openAddEditModal(ligneSortie?: ILigneSortie): void {
    const modalRef = this.modalService.open(AddEditLigneSortieComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != ligneSortie?.idLigneSortie) {
      modalRef.componentInstance.ligneSortie = cloneDeep(ligneSortie);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }
}
