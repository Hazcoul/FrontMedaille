import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntreeService } from '../../../services/entree.service';
import { IEntree } from 'src/app/entities/entree.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entree',
  templateUrl: './entree.component.html',
  styleUrl: './entree.component.scss'
})
export class EntreeComponent implements OnInit, OnDestroy {

  entrees?: IEntree[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate= 'idEntree';
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    private entreeService: EntreeService,
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

    this.entreeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IEntree[]>) => {
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

  trackId(index: number, item: IEntree): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.idEntree!;
  }

  // registerChangeInbeneficiaires(): void {
  //   this.eventSubscriber = this.eventManager.subscribe('beneficiairesListModification', () => this.loadPage());
  // }

  confirmDeleteItem(entree: IEntree): void {
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
        this.delete(entree);
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  delete(entree: IEntree): void {
   this.entreeService.delete(entree.idEntree!).subscribe({
    next: (res) => {
      this.loadPage();
    },
    error: (e) =>console.log('ERROR : ', e)
   })
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idEntree') {
      result.push('idEntree');
    }
    return result;
  }

  protected onSuccess(data: IEntree[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/mouvement/entree'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.entrees = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  editItem(entree: IEntree): void {
    this.router.navigate(['mouvement', 'entree', entree.idEntree, 'edit'])
  }

  showItem(entree: IEntree): void {
    this.router.navigate(['mouvement', 'entree', entree.idEntree, 'details'])
  }
}
