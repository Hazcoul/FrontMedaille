import { Component } from '@angular/core';
import {Fournisseur, IFournisseur} from "../../../entities/fournisseur.model";
import {ITEMS_PER_PAGE, MAX_SIZE} from "../../../shared/constants/pagination.constant";
import {Subscription} from "rxjs";
import {Entree} from "../../../entities/entree.model";
import {EntreeService} from "../../../services/entree.service";
import {FilterEntree} from "../../../entities/filterEntree.model";
import {HttpResponse} from "@angular/common/http";
import {FournisseurService} from "../../../services/fournisseur.service";

@Component({
  selector: 'app-stat-commandes',
  templateUrl: './stat-commandes.component.html',
  styleUrl: './stat-commandes.component.scss'
})
export class StatCommandesComponent {
  fournisseurs: Fournisseur[] = [];
  commandes: Entree[] = []
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  maxSize = MAX_SIZE;
 // page =  0;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  recherche: Entree = new Entree();
  filterEntree: FilterEntree = new FilterEntree();
  page: any;
  previousPage: any;

  constructor(
    private entreeService: EntreeService,
    private fournisseurService: FournisseurService

  ) {
  }

  ngOnInit(): void {
    this.getFournisseurs();

  }

  getFournisseurs(){
    this.fournisseurService.query().subscribe({
      next: (res: HttpResponse<IFournisseur[]>) => {
        this.fournisseurs = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
  }

  loadPage(page?: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getAllCommandes();
    }
  }

  getAllCommandes() {
    const request = {
      page: this.page - 1,
      size: this.itemsPerPage,
    };
    this.commandes = [];
    console.warn("filter",this.filterEntree);
    const result = this.entreeService.getCommandes(request, this.filterEntree).subscribe(
      response => {
        console.log(response.body);
        if (response.body === null || response.body.length === 0) {
         // this.notification.open('warning', 'Aucune demande trouvée !');
        } else {
          this.commandes = response.body;
          this.totalItems = Number(response.headers.get('X-Total-Count'));
          console.warn('TOTAL',response.headers)
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
      }
    );
  }

  exportToPdf(entree: Entree) {
    this.entreeService.generateStatistique(entree.idEntree!).subscribe({
      next: response => {
        console.log(response);
        if (response !== null) {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        }
      },
      error: err => {
      }
    });
  }
}
