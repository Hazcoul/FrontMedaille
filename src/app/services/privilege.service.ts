import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';
import {IPrivilege} from "../entities/privilege.model";

type EntityResponseType = HttpResponse<IPrivilege>;
type EntityArrayResponseType = HttpResponse<IPrivilege[]>;

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  public resourceUrl = SERVER_API_URL + 'api/auth/privileges';

  constructor(protected http: HttpClient) {}

  create(privilege: IPrivilege): Observable<EntityResponseType> {
    return this.http.post<IPrivilege>(`${this.resourceUrl}/new`, privilege, { observe: 'response' })
  }

  update(privilege: IPrivilege): Observable<EntityResponseType> {
    return this.http
      .put<IPrivilege>(this.resourceUrl, privilege, { observe: 'response' })}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPrivilege>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrivilege[]>(`${this.resourceUrl}/list`, { params: options, observe: 'response' })
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
