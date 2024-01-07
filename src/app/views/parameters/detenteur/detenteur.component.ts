import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { DetenteurService } from '../../../services/detenteur.service';
import { IDetenteur} from '../../../entities/detenteur';
import { ITEMS_PER_PAGE,NEXT_PAGE,PREV_PAGE } from '../../../shared/constants/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditDetenteurComponent } from './add-edit-detenteur/add-edit-detenteur.component';
import { cloneDeep, entries } from 'lodash-es';
import Swal from 'sweetalert2';
import { DetailDetenteurComponent } from './detail-detenteur/detail-detenteur.component';

@Component({
  selector: 'app-detenteur',
  templateUrl: './detenteur.component.html',
  styleUrl: './detenteur.component.scss'
})
export class DetenteurComponent implements OnInit, OnDestroy {

  @Input() currentPage : any;
  @Input() totalItems = 0;
  @Input() itemsPerPage = ITEMS_PER_PAGE;
  @Output() onClick: EventEmitter<number> = new EventEmitter();

  detenteurs?: IDetenteur[];
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
    private detenteurService: DetenteurService,
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

    this.detenteurService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IDetenteur[]>) => {
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();
  }

  trackId(index: number, item: IDetenteur): number {
    return item.idDetenteur!;
  }

  confirmDeleteItem(detenteur: IDetenteur) {
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
        this.delete(detenteur);
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  delete(detenteur: IDetenteur): void {
    this.detenteurService.delete(detenteur.idDetenteur!).subscribe({
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

  protected onSuccess(data: IDetenteur[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/parametre/detenteur'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    //alert("hors if et "+ JSON.stringify(data?.entries));
    this.detenteurs = data || [];
    if(this.detenteurs.length!=0 && this.detenteurs.length != undefined){
      //alert("dans if");
      this.ngbPaginationPage = this.page;
      this.totalPages = Math.ceil(this.detenteurs.length/this.itemsPerPage);
      if(this.currentPage==null) this.currentPage =page;
      this.pages = Array.from({length:this.totalPages }, (_, i)=> i + 1);
      this.start = (this.currentPage-1)*this.itemsPerPage;
      this.end = this.start+this.itemsPerPage;
      if(this.detenteurs.length > this.itemsPerPage){
        this.detenteurs = data?.slice(this.start,this.end);
      }
      //alert("start = "+this.start +" et end="+this.end);  
    }
    
  }
  pageClicked(page : number){
    this.onClick.emit(page);
  }

  changePage(page : number){
    //alert("page = "+page);
    this.currentPage=page;
    this.loadPage();
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  openAddEditModal(detenteur?: IDetenteur): void {
    const modalRef = this.modalService.open(AddEditDetenteurComponent, { size: 'lg', backdrop: 'static' });
    if(undefined != detenteur?.idDetenteur) {
      modalRef.componentInstance.detenteur = cloneDeep(detenteur);
    }
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }

  openDetailModal(detenteur: IDetenteur): void {
    const modalRef = this.modalService.open(DetailDetenteurComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detenteur = detenteur;
    modalRef.result.then(() => {
      this.loadPage();
    },
    error => {
      console.log(error)
    })
  }
}
