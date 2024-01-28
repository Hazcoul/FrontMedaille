import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { BeneficiaireService } from '../../../services/beneficiaire.service';
import { IBeneficiaire } from '../../../entities/beneficiaire.model';
import { ITEMS_PER_PAGE, NEXT_PAGE, PREV_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from './add-edit/add-edit.component';
import { cloneDeep } from 'lodash-es';
import Swal from 'sweetalert2';
import { DetailBeneficiaireComponent } from './detail-beneficiaire/detail-beneficiaire.component';

@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrl: './beneficiaire.component.scss'
})
export class BeneficiaireComponent implements OnInit, OnDestroy {

  beneficiaires?: IBeneficiaire[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  isLoading = false;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  nextLabel = NEXT_PAGE;
  previousLabel = PREV_PAGE;
  predicate = 'idBeneficiaire';
  ascending!: boolean;

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

    this.beneficiaireService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IBeneficiaire[]>) => {
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
        // const page = params.get('page');
        // this.page = +(page ?? 1);
        // const sort = (params.get('sort') ?? data['defaultSort']).split(',');
        // this.predicate = sort[0];
        // this.ascending = sort[1] === 'ASC';
        this.loadPage();
      }
    );

  }

  trackId(index: number, item: IBeneficiaire): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.idBeneficiaire!;
  }

  // registerChangeInbeneficiaires(): void {
  //   this.eventSubscriber = this.eventManager.subscribe('beneficiairesListModification', () => this.loadPage());
  // }

  confirmDeleteItem(beneficiaire: IBeneficiaire) {
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
        this.delete(beneficiaire);
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  delete(beneficiaire: IBeneficiaire): void {
    this.beneficiaireService.delete(beneficiaire.idBeneficiaire!).subscribe({
      next: (res) => {
        this.loadPage();
      },
      error: (e) => console.log('ERROR: ', e)
    })
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idBeneficiaire') {
      result.push('idBeneficiaire');
    }
    return result;
  }

  protected onSuccess(data: IBeneficiaire[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('x-total-count'));
    console.log('TOTAL_ITEMS =', this.totalItems);
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
  }

  protected onError(): void {
    this.isLoading = false;
  }

  openAddEditModal(beneficiaire?: IBeneficiaire): void {
    const modalRef = this.modalService.open(AddEditComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != beneficiaire?.idBeneficiaire) {
      console.log('BENEFICIAIRE TO EDIT : ', beneficiaire);
      modalRef.componentInstance.beneficiaire = cloneDeep(beneficiaire);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }

  openDetailModal(beneficiaire: IBeneficiaire): void {
    const modalRef = this.modalService.open(DetailBeneficiaireComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.beneficiaire = beneficiaire;
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }
}
