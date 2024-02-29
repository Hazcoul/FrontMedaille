import { Component } from '@angular/core';
import {IUtilisateur, Utilisateur} from "../../../../entities/utilisateur.model";
import {UtilisateurService} from "../../../../services/utilisateur.service";
import {Router} from "@angular/router";
import {ITEMS_PER_PAGE} from "../../../../shared/constants/pagination.constant";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent {
  utilisateurs: Utilisateur[] = [];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadPage();
  }
  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.utilisateurService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IUtilisateur[]>) => {
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

  protected onSuccess(data: IUtilisateur[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['pages','securite','utilisateurs'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.utilisateurs = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  goToUpdateCreate() {
    this.router.navigate(['pages','securite','utilisateurs','creation']);
  }

  removeUser(user: Utilisateur) {
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

  resetAccountTodefault(user: Utilisateur) {
    Swal.fire({
      title: "Etes-vous vraiment sûr?",
      text: "Cette action est irréversible et reinitialisera le mot de passe par admin2023!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, procéder!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.reset(user);
      }
    });
  }

  disableAccount(user: Utilisateur) {
    Swal.fire({
      title: "Etes-vous vraiment sûr?",
      text: "L'utilisteur concerné ne pourra plus se connecter!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, procéder!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.disable(user);
      }
    });
  }

  goToEditPage(user: Utilisateur){
    this.router.navigate(['pages','securite','utilisateurs','modification',user.id]);
  }


   reset(user: Utilisateur) {
    console.warn("LOGIN",user.login);
     this.utilisateurService.requestPasswordReset(user.login!).subscribe(data=>{
       if(data.body && data.body.code == "0"){
         Swal.fire({
           title: "",
           text: data.body.msg,
           icon: "success"
         });
       }else{
         Swal.fire({
           title: "",
           text: data.body!.msg,
           icon: "success"
         });
       }
     })
   }

  private disable(user: Utilisateur) {
    this.utilisateurService.disableAccount(user.login!).subscribe(data=>{
      if(data.body && data.body.code == "0"){
        Swal.fire({
          title: "",
          text: data.body.msg,
          icon: "success"
        });
      }else{
        Swal.fire({
          title: "",
          text: data.body!.msg,
          icon: "success"
        });
      }
    })
  }
}
