import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';

import { ISortie } from '../entities/sortie.model';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';
import {FilterEntree} from "../entities/filterEntree.model";
import {Entree} from "../entities/entree.model";
import {LigneSortieImpression} from "../entities/ligne-sortie-impression.model";
import { IPieceJointe } from '../entities/piece-jointe.model';


type EntityResponseType = HttpResponse<ISortie>;
type EntityArrayResponseType = HttpResponse<ISortie[]>;

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  public resourceUrl = SERVER_API_URL + 'api/sorties';

  constructor(protected http: HttpClient) {}

  create(sortie: ISortie, pieceJointes: IPieceJointe[], files: File[]): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sortie);
    const formData: FormData = new FormData();
    for(let i = 0; i < files.length; i++ ) {
      formData.append('pjFiles', files[i]);
    }
    formData.append('pjData', new Blob([JSON
      .stringify(pieceJointes)], {
      type: 'application/json'
    }));
    formData.append('data', new Blob([JSON
        .stringify(copy)], {
      type: 'application/json'
    }));
    return this.http
      .post<ISortie>(this.resourceUrl, formData, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sortie: ISortie, pieceJointes: IPieceJointe[], files: File[]): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sortie);
    const formData: FormData = new FormData();
    for(let i = 0; i < files.length; i++ ) {
      formData.append('pjFiles', files[i]);
    }
    formData.append('pjData', new Blob([JSON
      .stringify(pieceJointes)], {
      type: 'application/json'
    }));
    formData.append('data', new Blob([JSON
        .stringify(copy)], {
      type: 'application/json'
    }));
    return this.http
      .put<ISortie>(this.resourceUrl, formData, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISortie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISortie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sortie: ISortie): ISortie {
    const copy: ISortie = Object.assign({}, sortie, {
      createdDate: sortie.createdDate && sortie.createdDate.isValid() ? sortie.createdDate.toJSON() : undefined,
      lastModifiedDate: sortie.lastModifiedDate && sortie.lastModifiedDate.isValid() ? sortie.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((sortie: ISortie) => {
        sortie.createdDate = sortie.createdDate ? moment(sortie.createdDate) : undefined;
        sortie.lastModifiedDate = sortie.lastModifiedDate ? moment(sortie.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

  public getSorties(req: any, recherche: FilterEntree): Observable<HttpResponse<ISortie[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
      key => {
        options = options.set(key, req[key]);
      }
    );
    return this.http.post<ISortie[]>(this.resourceUrl+'/statistique/sorties', recherche, { params: options, observe: 'response' });
  }
  public getSortiesWithoutPagination(recherche: FilterEntree): Observable<HttpResponse<ISortie[]>> {
    return this.http.post<ISortie[]>(this.resourceUrl+'/statistique/sorties', recherche, {observe: 'response' });
  }

  generateStatistique(idSortie:number) {
    return this.http.get(`${this.resourceUrl}/statistique/sorties/impression/${idSortie}`, { observe: 'body', responseType: 'arraybuffer' });
  }

  public getSortiesByperiode(req: any, recherche: FilterEntree): Observable<HttpResponse<LigneSortieImpression[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
        key => {
          options = options.set(key, req[key]);
        }
    );
    return this.http.post<LigneSortieImpression[]>(this.resourceUrl+'/statistique/sorties/periode', recherche, { params: options, observe: 'response' });
  }

  public getSortiesByperiodeWithoutPagination(recherche: FilterEntree): Observable<HttpResponse<LigneSortieImpression[]>> {
    return this.http.post<LigneSortieImpression[]>(this.resourceUrl+'/statistique/sorties/periode', recherche, { observe: 'response' });
  }

  generateStatistiquePeriode(recherche: FilterEntree) {
    return this.http.post(`${this.resourceUrl}/statistique/sorties/periode/impression`,recherche, { observe: 'body', responseType: 'arraybuffer' });
  }

  generateEtat(id:number, format: string) {
    return this.http.get(`${this.resourceUrl}/${id}/bordereau/${format}`, { observe: 'body', responseType: 'arraybuffer' });
  }

  valider(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISortie>(`${this.resourceUrl}/${id}/valider`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  rejeter(id: number, comment: string): Observable<EntityResponseType> {
    return this.http
      .get<ISortie>(`${this.resourceUrl}/${id}/rejeter?comment=${comment}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
}
