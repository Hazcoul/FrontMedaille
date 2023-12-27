import { Component } from '@angular/core';
import {ITEMS_PER_PAGE} from "../../../../shared/constants/pagination.constant";
import {Router} from "@angular/router";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {IProfil} from "../../../../entities/profil.model";
import {ProfilService} from "../../../../services/profil.service";
import {IBeneficiaire} from "../../../../entities/beneficiaire.model";
import {AddEditComponent} from "../../../parameters/beneficiaire/add-edit/add-edit.component";
import {cloneDeep} from "lodash-es";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateUpdateProfilComponent} from "./create-update-profil/create-update-profil.component";

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrl: './profils.component.scss'
})
export class ProfilsComponent {
  profils: IProfil[] = [];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;



  constructor(
    private profilService: ProfilService,
    private router: Router,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.loadPage();
  }
  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.profilService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IProfil[]>) => {
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();
  }



  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IProfil[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['pages','securite','profils'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.profils = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  goToUpdateCreate() {
    this.router.navigate(['pages','securite','profils','creation']);
  }

  removeUser(user: IProfil) {
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
        Swal.fire({
          title: "Supprimé!",
          text: "Element supprimé.",
          icon: "success"
        });
      }
    });
  }

  removeProfil(profil: IProfil) {

  }

  openAddEditModal(beneficiaire?: IBeneficiaire): void {
    const modalRef = this.modalService.open(CreateUpdateProfilComponent, { size: 'lg', backdrop: 'static' });
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
