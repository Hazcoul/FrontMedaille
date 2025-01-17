import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { IBeneficiaire } from '../entities/beneficiaire.model';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';
import {IUtilisateur} from "../entities/utilisateur.model";
import {MResponse} from "../entities/m-response.model";
import {ResetPassword} from "../entities/reset-password.model";

type EntityResponseType = HttpResponse<IUtilisateur>;
type EntityArrayResponseType = HttpResponse<IUtilisateur[]>;

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public resourceUrl = SERVER_API_URL + 'api/auth/utilisateurs';

  constructor(protected http: HttpClient) {}

  create(user: IUtilisateur): Observable<EntityResponseType> {
    return this.http.post<IUtilisateur>(`${this.resourceUrl}/new`, user, { observe: 'response' })
  }

  update(user: IUtilisateur): Observable<EntityResponseType> {
    return this.http
      .put<IUtilisateur>(this.resourceUrl, user, { observe: 'response' })}

  updateWithProfils(user: IUtilisateur): Observable<EntityResponseType> {
    return this.http
      .put<IUtilisateur>(`${this.resourceUrl}/update/${user.id}`, user, { observe: 'response' })}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUtilisateur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUtilisateur[]>(`${this.resourceUrl}/list`, { params: options, observe: 'response' })
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  count(): Observable<HttpResponse<any>> {
    return this.http
        .get<any>(`${this.resourceUrl}/statistique/count`, { observe: 'response' })
  }

  public requestPasswordReset(login: string): Observable<HttpResponse<MResponse>> {
    return this.http.post<MResponse>(`${this.resourceUrl}/reset-password-by-admin/init`, login, { observe: 'response' });
  }

  public disableAccount(login: string): Observable<HttpResponse<MResponse>> {
    return this.http.post<MResponse>(`${this.resourceUrl}/disable-account`, login, { observe: 'response' });
  }

  updatePasswd(resetPassword: ResetPassword): Observable<HttpResponse<MResponse>> {
    return this.http.post<MResponse>(`${this.resourceUrl}/reset-connect-password`, resetPassword,{ observe: 'response' })
  }

  findUserInfo(): Observable<EntityResponseType> {
    return this.http
      .get<IUtilisateur>(`${this.resourceUrl}/utilisateur-info`, { observe: 'response' })
  }

}
