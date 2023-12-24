import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { IBeneficiaire } from '../entities/beneficiaire.model';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';

type EntityResponseType = HttpResponse<IBeneficiaire>;
type EntityArrayResponseType = HttpResponse<IBeneficiaire[]>;

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  public resourceUrl = SERVER_API_URL + 'api/beneficiaires';

  constructor(protected http: HttpClient) {}

  create(beneficiare: IBeneficiaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(beneficiare);
    return this.http
      .post<IBeneficiaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(beneficiaire: IBeneficiaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(beneficiaire);
    return this.http
      .put<IBeneficiaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBeneficiaire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBeneficiaire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(beneficiaire: IBeneficiaire): IBeneficiaire {
    const copy: IBeneficiaire = Object.assign({}, beneficiaire, {
      createdDate: beneficiaire.createdDate && beneficiaire.createdDate.isValid() ? beneficiaire.createdDate.toJSON() : undefined,
      lastModifiedDate: beneficiaire.lastModifiedDate && beneficiaire.lastModifiedDate.isValid() ? beneficiaire.lastModifiedDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((beneficiaire: IBeneficiaire) => {
        beneficiaire.createdDate = beneficiaire.createdDate ? moment(beneficiaire.createdDate) : undefined;
        beneficiaire.lastModifiedDate = beneficiaire.lastModifiedDate ? moment(beneficiaire.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
