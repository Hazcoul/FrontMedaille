import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';

import {Entree, IEntree} from '../entities/entree.model';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';
import {Medaille} from "../entities/medaille.model";
import {FilterEntree} from "../entities/filterEntree.model";


type EntityResponseType = HttpResponse<IEntree>;
type EntityArrayResponseType = HttpResponse<IEntree[]>;

@Injectable({
  providedIn: 'root'
})
export class EntreeService {

  public resourceUrl = SERVER_API_URL + 'api/entrees';

  constructor(protected http: HttpClient) {}

  create(entree: IEntree): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entree);
    return this.http
      .post<IEntree>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(entree: IEntree): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entree);
    return this.http
      .put<IEntree>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEntree>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEntree[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(entree: IEntree): IEntree {
    const copy: IEntree = Object.assign({}, entree, {
      createdDate: entree.createdDate && entree.createdDate.isValid() ? entree.createdDate.toJSON() : undefined,
      lastModifiedDate: entree.lastModifiedDate && entree.lastModifiedDate.isValid() ? entree.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((entree: IEntree) => {
        entree.createdDate = entree.createdDate ? moment(entree.createdDate) : undefined;
        entree.lastModifiedDate = entree.lastModifiedDate ? moment(entree.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

  public getCommandes(req: any, recherche: FilterEntree): Observable<HttpResponse<Entree[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
      key => {
        options = options.set(key, req[key]);
      }
    );
    return this.http.post<Entree[]>(this.resourceUrl+'/statistique/commandes', recherche, { params: options, observe: 'response' });
  }

  generateStatistique(idCommande:number) {
    return this.http.get(`${this.resourceUrl}/statistique/commandes/impression/${idCommande}`, { observe: 'body', responseType: 'arraybuffer' });
  }

  generateEtat(id:number, format: string) {
    return this.http.get(`${this.resourceUrl}/${id}/valider/etat/${format}`, { observe: 'body', responseType: 'arraybuffer' });
  }

  valider(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEntree>(`${this.resourceUrl}/${id}/valider`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  rejeter(id: number, comment: string): Observable<EntityResponseType> {
    return this.http
      .get<IEntree>(`${this.resourceUrl}/${id}/rejeter?comment=${comment}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
}
