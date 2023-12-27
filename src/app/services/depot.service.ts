import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { IDepot} from '../entities/depot.model';
import { createRequestOption } from '../shared/util/request.util';

type EntityResponseType = HttpResponse<IDepot>;
type EntityArrayResponseType = HttpResponse<IDepot[]>;

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  public resourceUrl = SERVER_API_URL + 'api/depots';

  constructor(protected http: HttpClient) { }

  create(depot: IDepot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(depot);
    return this.http
      .post<IDepot>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(depot: IDepot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(depot);
    return this.http
      .put<IDepot>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDepot>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDepot[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(depot: IDepot): IDepot {
    const copy: IDepot = Object.assign({}, depot, {
      createdDate: depot.createdDate && depot.createdDate.isValid() ? depot.createdDate.toJSON() : undefined,
      lastModifiedDate: depot.lastModifiedDate && depot.lastModifiedDate.isValid() ? depot.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((depot: IDepot) => {
        depot.createdDate = depot.createdDate ? moment(depot.createdDate) : undefined;
        depot.lastModifiedDate = depot.lastModifiedDate ? moment(depot.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
