import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';
import {IProfil} from "../entities/profil.model";

type EntityResponseType = HttpResponse<IProfil>;
type EntityArrayResponseType = HttpResponse<IProfil[]>;

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  public resourceUrl = SERVER_API_URL + 'api/auth/profils';

  constructor(protected http: HttpClient) {}

  create(profil: IProfil): Observable<EntityResponseType> {
    return this.http.post<IProfil>(`${this.resourceUrl}/new`, profil, { observe: 'response' })
  }

  update(profil: IProfil): Observable<EntityResponseType> {
    return this.http
      .put<IProfil>(`${this.resourceUrl}/update`, profil, { observe: 'response' })}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfil>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfil[]>(`${this.resourceUrl}/list`, { params: options, observe: 'response' })
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
