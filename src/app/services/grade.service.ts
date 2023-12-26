import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { IGrade} from '../entities/grade.model';
import { createRequestOption } from '../shared/util/request.util';

type EntityResponseType = HttpResponse<IGrade>;
type EntityArrayResponseType = HttpResponse<IGrade[]>;

@Injectable({
  providedIn: 'root'
})
export class gradeService {

  public resourceUrl = SERVER_API_URL + 'api/grades';

  constructor(protected http: HttpClient) { }

  create(grade: IGrade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .post<IGrade>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(grade: IGrade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .put<IGrade>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGrade>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGrade[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(grade: IGrade): IGrade {
    const copy: IGrade = Object.assign({}, grade, {
      createdDate: grade.createdDate && grade.createdDate.isValid() ? grade.createdDate.toJSON() : undefined,
      lastModifiedDate: grade.lastModifiedDate && grade.lastModifiedDate.isValid() ? grade.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((grade: IGrade) => {
        grade.createdDate = grade.createdDate ? moment(grade.createdDate) : undefined;
        grade.lastModifiedDate = grade.lastModifiedDate ? moment(grade.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
