import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import {IMedaille, Medaille} from '../entities/medaille.model';
import { createRequestOption } from '../shared/util/request.util';

type EntityResponseType = HttpResponse<IMedaille>;
type EntityArrayResponseType = HttpResponse<IMedaille[]>;

@Injectable({
  providedIn: 'root'
})
export class MedailleService {

  public resourceUrl = SERVER_API_URL + 'api/medailles';

  constructor(protected http: HttpClient) { }

  create(medaille: IMedaille): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(medaille);
    return this.http
      .post<IMedaille>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(medaille: IMedaille): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(medaille);
    return this.http
      .put<IMedaille>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createMedailleWithImage(file:any,medaille: Medaille): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', file);
    formData.append('data', new Blob([JSON
        .stringify(medaille)], {
      type: 'application/json'
    }));
    return this.http.post(this.resourceUrl, formData).pipe(map((data: any) => {
      return data;
    }));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMedaille>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMedaille[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(medaille: IMedaille): IMedaille {
    const copy: IMedaille = Object.assign({}, medaille, {
      createdDate: medaille.createdDate && medaille.createdDate.isValid() ? medaille.createdDate.toJSON() : undefined,
      lastModifiedDate: medaille.lastModifiedDate && medaille.lastModifiedDate.isValid() ? medaille.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((medaille: IMedaille) => {
        medaille.createdDate = medaille.createdDate ? moment(medaille.createdDate) : undefined;
        medaille.lastModifiedDate = medaille.lastModifiedDate ? moment(medaille.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
