import { Component } from '@angular/core';
import {IPrivilege, Privilege} from "../../../../entities/privilege.model";
import {Subscription} from "rxjs";
import {ITEMS_PER_PAGE} from "../../../../shared/constants/pagination.constant";
import {BeneficiaireService} from "../../../../services/beneficiaire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {IBeneficiaire} from "../../../../entities/beneficiaire.model";
import {PrivilegeService} from "../../../../services/privilege.service";

@Component({
  selector: 'app-droits',
  templateUrl: './droits.component.html',
  styleUrl: './droits.component.scss'
})
export class DroitsComponent {
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  privileges: Privilege[] = [];

  constructor(
    private privilegeService: PrivilegeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.handleNavigation();
  }

  ngOnDestroy(): void {
    console.log('Dans ben com, ngOnDestroy');
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.privilegeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        {
          next: (res: HttpResponse<IPrivilege[]>) => {
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => this.onError(),
        }
      );
  }

  protected handleNavigation(): void {
    this.loadPage();
  }

  trackId(index: number, item: IBeneficiaire): number {
    return item.idBeneficiaire!;
  }


  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'idBeneficiaire') {
      result.push('idBeneficiaire');
    }
    return result;
  }

  protected onSuccess(data: IPrivilege[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/pages/securite/droits'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.privileges = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

}
