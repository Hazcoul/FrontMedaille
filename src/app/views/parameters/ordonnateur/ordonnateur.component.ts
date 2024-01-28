import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { OrdonnateurService } from '../../../services/ordonnateur.service';
import { IOrdonnateur } from '../../../entities/ordonnateur.model';
import { ITEMS_PER_PAGE, NEXT_PAGE, PREV_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditOrdonnateurComponent } from './add-edit-ordonnateur/add-edit-ordonnateur.component';
import { cloneDeep } from 'lodash-es';
import Swal from 'sweetalert2';
import { DetailOrdonnateurComponent } from './detail-ordonnateur/detail-ordonnateur.component';

@Component({
  selector: 'app-ordonnateur',
  templateUrl: './ordonnateur.component.html',
  styleUrl: './ordonnateur.component.scss'
})
export class OrdonnateurComponent implements OnInit, OnDestroy {

  ordonnateurs?: IOrdonnateur[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  isLoading = false;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  nextLabel = NEXT_PAGE;
  previousLabel = PREV_PAGE;
  predicate = 'idOrdonnateur';
  ascending!: boolean;

  constructor(
    private ordonnateurService: OrdonnateurService,
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

    this.ordonnateurService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IOrdonnateur[]>) => {
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

  trackId(index: number, item: IOrdonnateur): number {
    
    return item.idOrdonnateur!;
  }

  confirmDeleteItem(ordonnateur: IOrdonnateur) {
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
        this.delete(ordonnateur);
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  delete(ordonnateur: IOrdonnateur): void {
    this.ordonnateurService.delete(ordonnateur.idOrdonnateur!).subscribe({
      next: (res) => {
        this.loadPage();
      },
      error: (e) => console.log('ERROR: ', e)
    })
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idOrdonnateur') {
      result.push('idOrdonnateur');
    }
    return result;
  }

  protected onSuccess(data: IOrdonnateur[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('x-total-count'));
    console.log('TOTAL_ITEMS =', this.totalItems);
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/ordonnateur'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.ordonnateurs = data || [];
  }

  protected onError(): void {
    this.isLoading = false;
  }

  openAddEditModal(ordonnateur?: IOrdonnateur): void {
    const modalRef = this.modalService.open(AddEditOrdonnateurComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != ordonnateur?.idOrdonnateur) {
      console.log('ORDONNATEUR TO EDIT : ', ordonnateur);
      modalRef.componentInstance.ordonnateur = cloneDeep(ordonnateur);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }

  openDetailModal(ordonnateur: IOrdonnateur): void {
    const modalRef = this.modalService.open(DetailOrdonnateurComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ordonnateur = ordonnateur;
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }
}
