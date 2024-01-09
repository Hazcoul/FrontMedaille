import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { MagasinService } from '../../../services/magasin.service';
import { IMagasin} from '../../../entities/magasin.model';
import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constant';
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
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

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
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();    
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
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IMagasin[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
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
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
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
