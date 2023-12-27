import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { IMagasin} from '../entities/magasin.model';
import { createRequestOption } from '../shared/util/request.util';

type EntityResponseType = HttpResponse<IMagasin>;
type EntityArrayResponseType = HttpResponse<IMagasin[]>;

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  public resourceUrl = SERVER_API_URL + 'api/magasins';

  constructor(protected http: HttpClient) { }

  create(magasin: IMagasin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(magasin);
    return this.http
      .post<IMagasin>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(magasin: IMagasin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(magasin);
    return this.http
      .put<IMagasin>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMagasin>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMagasin[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(magasin: IMagasin): IMagasin {
    const copy: IMagasin = Object.assign({}, magasin, {
      createdDate: magasin.createdDate && magasin.createdDate.isValid() ? magasin.createdDate.toJSON() : undefined,
      lastModifiedDate: magasin.lastModifiedDate && magasin.lastModifiedDate.isValid() ? magasin.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((magasin: IMagasin) => {
        magasin.createdDate = magasin.createdDate ? moment(magasin.createdDate) : undefined;
        magasin.lastModifiedDate = magasin.lastModifiedDate ? moment(magasin.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
