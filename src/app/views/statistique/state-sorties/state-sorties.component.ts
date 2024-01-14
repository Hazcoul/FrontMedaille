import {Component} from '@angular/core';
import {Fournisseur, IFournisseur} from "../../../entities/fournisseur.model";
import {Entree} from "../../../entities/entree.model";
import {Subscription} from "rxjs";
import {ITEMS_PER_PAGE, MAX_SIZE} from "../../../shared/constants/pagination.constant";
import {FilterEntree} from "../../../entities/filterEntree.model";
import {FournisseurService} from "../../../services/fournisseur.service";
import {HttpResponse} from "@angular/common/http";
import {Sortie} from "../../../entities/sortie.model";
import {SortieService} from "../../../services/sortie.service";
import {FilterSortie} from "../../../entities/filterSortie.model";
import {Beneficiaire, IBeneficiaire} from "../../../entities/beneficiaire.model";
import {IDetenteur} from "../../../entities/detenteur";
import {IOrdonnateur} from "../../../entities/ordonnateur.model";
import {BeneficiaireService} from "../../../services/beneficiaire.service";
import {DetenteurService} from "../../../services/detenteur.service";
import {OrdonnateurService} from "../../../services/ordonnateur.service";
import {ReferentialService} from "../../../services/referential.service";

@Component({
  selector: 'app-state-sorties',
  templateUrl: './state-sorties.component.html',
  styleUrl: './state-sorties.component.scss'
})
export class StateSortiesComponent {
  sorties: Sortie[] = []
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  maxSize = MAX_SIZE;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  filterSortie: FilterSortie = new FilterSortie();
  page: any;
  previousPage: any;
  beneficiaires: Beneficiaire[] = [];
  detenteurs: IDetenteur[] = [];
  ordonnateurs: IOrdonnateur[] = [];
  referentials?: any;

  constructor(
    private sortieService: SortieService,
    private beneficiaireService: BeneficiaireService,
    private detenteurService: DetenteurService,
    private ordonnateurService: OrdonnateurService,
    private referentialService: ReferentialService
  ) {
  }

  ngOnInit(): void {
    this.getAllFilterParameter()
  }

  getAllFilterParameter() {
    this.referentialService.query().subscribe({
      next: (res: HttpResponse<any>) => {
        this.referentials = res.body || [];
        console.log('REFERENTIALS : ', this.referentials);
      },
      error: (e) => console.log('ERROR : ', e)
    })

    this.beneficiaireService.query().subscribe({
      next: (res: HttpResponse<IBeneficiaire[]>) => {
        this.beneficiaires = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
    /**
     * Get all detenteurs
     */
    this.detenteurService.query().subscribe({
      next: (res: HttpResponse<IDetenteur[]>) => {
        this.detenteurs = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
    /**
     * Get all ordonnateurs
     */
    this.ordonnateurService.query().subscribe({
      next: (res: HttpResponse<IOrdonnateur[]>) => {
        this.ordonnateurs = res.body || [];
      },
      error: (e) => console.log('ERROR : ', e)
    })
  }

  loadPage(page?: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getAllSorties();
    }
  }

  getAllSorties() {
    console.warn("filterSortie",this.filterSortie);
    const request = {
      page: this.page - 1,
      size: this.itemsPerPage,
    };
    this.sorties = [];
    const result = this.sortieService.getSorties(request, this.filterSortie).subscribe(
      response => {
        console.log(response.body);
        if (response.body === null || response.body.length === 0) {
        } else {
          this.sorties = response.body;
          this.totalItems = Number(response.headers.get('X-Total-Count'));
          console.warn('TOTAL', response.headers)
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
      }
    );
  }

  exportToPdf(sortie: Sortie) {
    this.sortieService.generateStatistique(sortie.idSortie!).subscribe({
      next: response => {
        console.log(response);
        if (response !== null) {
          const file = new Blob([response], {type: 'application/pdf'});
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        }
      },
      error: err => {
      }
    });
  }
}
