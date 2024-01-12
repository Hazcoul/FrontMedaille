import { Component, OnDestroy, OnInit, Input, Output } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { OrdonnateurService } from '../../../services/ordonnateur.service';
import { IOrdonnateur} from '../../../entities/ordonnateur.model';
import { ITEMS_PER_PAGE,NEXT_PAGE,PREV_PAGE } from '../../../shared/constants/pagination.constant';
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

  @Input() currentPage : any;
  @Input() totalItems = 0;
  @Input() itemsPerPage = ITEMS_PER_PAGE;


  ordonnateurs?: IOrdonnateur[];
  eventSubscriber?: Subscription;
  
  nextPage = NEXT_PAGE;
  previousPage = PREV_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  resultDeleted! : boolean;
  pages: number[] =[];
  totalPages = 1;
  start : number = 0;
  end? : number;

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
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();    
  }

  trackId(index: number, item: IOrdonnateur): number {
    return item.idOrdonnateur!;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
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

  protected onSuccess(data: IOrdonnateur[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
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
    //alert("hors if et "+ JSON.stringify(data?.entries));
    this.ordonnateurs = data || [];
    if(this.ordonnateurs.length!=0 && this.ordonnateurs.length != undefined){
      //alert("dans if");
      this.ngbPaginationPage = this.page;
      this.totalPages = Math.ceil(this.ordonnateurs.length/this.itemsPerPage);
      if(this.currentPage==null) this.currentPage =page;
      this.pages = Array.from({length:this.totalPages }, (_, i)=> i + 1);
      this.start = (this.currentPage-1)*this.itemsPerPage;
      this.end = this.start+this.itemsPerPage;
      if(this.ordonnateurs.length > this.itemsPerPage){
        this.ordonnateurs = data?.slice(this.start,this.end);
      }
    }
    
  }
  
  changePage(page : number){
    this.currentPage=page;
    this.loadPage();
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  openAddEditModal(ordonnateur?: IOrdonnateur): void {
    const modalRef = this.modalService.open(AddEditOrdonnateurComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != ordonnateur?.idOrdonnateur) {
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
