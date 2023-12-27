import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';

import { ISortie } from '../entities/sortie.model';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';


type EntityResponseType = HttpResponse<ISortie>;
type EntityArrayResponseType = HttpResponse<ISortie[]>;

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  public resourceUrl = SERVER_API_URL + 'api/sorties';

  constructor(protected http: HttpClient) {}

  create(sortie: ISortie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sortie);
    return this.http
      .post<ISortie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sortie: ISortie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sortie);
    return this.http
      .put<ISortie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISortie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISortie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sortie: ISortie): ISortie {
    const copy: ISortie = Object.assign({}, sortie, {
      createdDate: sortie.createdDate && sortie.createdDate.isValid() ? sortie.createdDate.toJSON() : undefined,
      lastModifiedDate: sortie.lastModifiedDate && sortie.lastModifiedDate.isValid() ? sortie.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((sortie: ISortie) => {
        sortie.createdDate = sortie.createdDate ? moment(sortie.createdDate) : undefined;
        sortie.lastModifiedDate = sortie.lastModifiedDate ? moment(sortie.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
