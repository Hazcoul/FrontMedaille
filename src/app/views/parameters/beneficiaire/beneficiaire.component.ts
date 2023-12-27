import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { BeneficiaireService } from '../../../services/beneficiaire.service';
import { IBeneficiaire } from '../../../entities/beneficiaire.model';
import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from './add-edit/add-edit.component';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrl: './beneficiaire.component.scss'
})
export class BeneficiaireComponent implements OnInit, OnDestroy {

  beneficiaires?: IBeneficiaire[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    private beneficiaireService: BeneficiaireService,
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

    this.beneficiaireService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IBeneficiaire[]>) => {
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

  trackId(index: number, item: IBeneficiaire): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.idBeneficiaire!;
  }

  // registerChangeInbeneficiaires(): void {
  //   this.eventSubscriber = this.eventManager.subscribe('beneficiairesListModification', () => this.loadPage());
  // }

  // delete(beneficiaires: IBeneficiaire): void {
  //   const modalRef = this.modalService.open(beneficiaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.beneficiaires = beneficiaires;
  // }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idBeneficiaire') {
      result.push('idBeneficiaire');
    }
    return result;
  }

  protected onSuccess(data: IBeneficiaire[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/beneficiaire'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.beneficiaires = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  openAddEditModal(beneficiaire?: IBeneficiaire): void {
    const modalRef = this.modalService.open(AddEditComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != beneficiaire?.idBeneficiaire) {
      modalRef.componentInstance.beneficiaire = cloneDeep(beneficiaire);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }
}
