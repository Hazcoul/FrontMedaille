import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { IDistinction} from '../entities/distinction.model';
import { createRequestOption } from '../shared/util/request.util';

type EntityResponseType = HttpResponse<IDistinction>;
type EntityArrayResponseType = HttpResponse<IDistinction[]>;

@Injectable({
  providedIn: 'root'
})
export class DistinctionService {

  public resourceUrl = SERVER_API_URL + 'api/distinctions';

  constructor(protected http: HttpClient) { }

  create(distinction: IDistinction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(distinction);
    return this.http
      .post<IDistinction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(distinction: IDistinction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(distinction);
    return this.http
      .put<IDistinction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDistinction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDistinction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(distinction: IDistinction): IDistinction {
    const copy: IDistinction = Object.assign({}, distinction, {
      createdDate: distinction.createdDate && distinction.createdDate.isValid() ? distinction.createdDate.toJSON() : undefined,
      lastModifiedDate: distinction.lastModifiedDate && distinction.lastModifiedDate.isValid() ? distinction.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((distinction: IDistinction) => {
        distinction.createdDate = distinction.createdDate ? moment(distinction.createdDate) : undefined;
        distinction.lastModifiedDate = distinction.lastModifiedDate ? moment(distinction.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
