import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { IOrdonnateur} from '../entities/ordonnateur.model';
import { createRequestOption } from '../shared/util/request.util';

type EntityResponseType = HttpResponse<IOrdonnateur>;
type EntityArrayResponseType = HttpResponse<IOrdonnateur[]>;

@Injectable({
  providedIn: 'root'
})
export class OrdonnateurService {

  public resourceUrl = SERVER_API_URL + 'api/ordonnateurs';

  constructor(protected http: HttpClient) { }

  create(beneficiare: IOrdonnateur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(beneficiare);
    return this.http
      .post<IOrdonnateur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(detenteur: IOrdonnateur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detenteur);
    return this.http
      .put<IOrdonnateur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrdonnateur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrdonnateur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(detenteur: IOrdonnateur): IOrdonnateur {
    const copy: IOrdonnateur = Object.assign({}, detenteur, {
      createdDate: detenteur.createdDate && detenteur.createdDate.isValid() ? detenteur.createdDate.toJSON() : undefined,
      lastModifiedDate: detenteur.lastModifiedDate && detenteur.lastModifiedDate.isValid() ? detenteur.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((detenteur: IOrdonnateur) => {
        detenteur.createdDate = detenteur.createdDate ? moment(detenteur.createdDate) : undefined;
        detenteur.lastModifiedDate = detenteur.lastModifiedDate ? moment(detenteur.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
