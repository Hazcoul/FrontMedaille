import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { ITEMS_PER_PAGE, NEXT_PAGE, PREV_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { SortieService } from '../../../services/sortie.service';
import { ISortie, Sortie } from '../../../entities/sortie.model'
import { AddEditLigneSortieComponent } from './add-edit-ligne-sortie/add-edit-ligne-sortie.component';
import { ILigneSortie } from 'src/app/entities/ligne-sortie.model';
import Swal from 'sweetalert2';
import { ReferentialService } from 'src/app/services/referential.service';
import { ConfirmePrintEtatComponent } from '../confirme-print-etat/confirme-print-etat.component';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrl: './sortie.component.scss'
})
export class SortieComponent implements OnInit, OnDestroy {

  referentials: any;
  sorties?: ISortie[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate = 'idSortie';
  ascending!: boolean;
  ngbPaginationPage = 1;
  sortie: ISortie = new Sortie();
  nextLabel = NEXT_PAGE;
  previousLabel = PREV_PAGE;

  constructor(
    private sortieService: SortieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private referentialService: ReferentialService
  ) {}

  ngOnInit(): void {
    /**
     * Get all referentials
     */
    this.referentialService.query().subscribe({
      next: (res: HttpResponse<any>) => {
        this.referentials = res.body || [];
        console.log('REFERENTIALS : ', this.referentials);
      },
      error: (e) => console.log('ERROR : ', e)
    })

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

  confirmDeleteItem(sortie: ISortie): void {
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
        this.delete(sortie);
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  delete(sortie: ISortie): void {
   this.sortieService.delete(sortie.idSortie!).subscribe({
    next: (res) => {
      this.loadPage();
    },
    error: (e) =>console.log('ERROR : ', e)
   })
  }

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

  editItem(sortie: ISortie): void {
    this.router.navigate(['mouvement', 'sortie', sortie.idSortie, 'edit'])
  }

  showItem(sortie: ISortie): void {
    this.router.navigate(['mouvement', 'sortie', sortie.idSortie, 'details'])
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
  
  getStatusLabel(value: string): string {
    const found = this.referentials.mvtStatus.find((status: any) => status.valeur == value);
    return found.libelle;
  }

  imprimer(sortie: ISortie): void {
    const modalRef = this.modalService.open(ConfirmePrintEtatComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.confirmeMsg = 'la sortie N° '.concat(sortie.numeroSortie!);
    modalRef.result.then((format) => {
      this.sortieService.generateEtat(sortie.idSortie!, format).subscribe({
        next: response => {
          console.log(response);
          if (response !== null) {
            const file = new Blob([response], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },
      error => console.log(error)
    )
  }
}
