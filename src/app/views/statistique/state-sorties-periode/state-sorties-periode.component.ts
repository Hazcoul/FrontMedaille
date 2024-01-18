import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {ITEMS_PER_PAGE, MAX_SIZE} from "../../../shared/constants/pagination.constant";
import {FilterSortie} from "../../../entities/filterSortie.model";
import {SortieService} from "../../../services/sortie.service";
import {ReferentialService} from "../../../services/referential.service";
import {HttpResponse} from "@angular/common/http";
import {ILigneSortieImpression} from "../../../entities/ligne-sortie-impression.model";

@Component({
  selector: 'app-state-sorties-periode',
  templateUrl: './state-sorties-periode.component.html',
  styleUrl: './state-sorties-periode.component.scss'
})
export class StateSortiesPeriodeComponent {
  sorties: ILigneSortieImpression[] = []
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
  referentials?: any;

  constructor(
    private sortieService: SortieService,
    private referentialService: ReferentialService
  ) {
  }

  ngOnInit(): void {
    this.getAllFilterParameter();
  }

  getAllFilterParameter() {
    this.referentialService.query().subscribe({
      next: (res: HttpResponse<any>) => {
        this.referentials = res.body || [];
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
      const result = this.sortieService.getSortiesByperiodeWithoutPagination(this.filterSortie).subscribe(
          response => {
            console.log(response.body);
            if (response.body === null || response.body.length === 0) {
            } else {
              this.sorties = response.body;
            }
            result.unsubscribe();
          },
          error => {
            result.unsubscribe();
          }
      );

    }


  exportToPdf() {
    console.warn("Filter variable",this.filterSortie)
    this.sortieService.generateStatistiquePeriode(this.filterSortie!).subscribe({
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
