import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';
import { IMedaille } from '../entities/medaille.model';
import * as moment from 'moment';
import { IPieceJointe } from '../entities/piece-jointe.model';

type EntityArrayResponseType = HttpResponse<IMedaille[]>;

@Injectable({
  providedIn: 'root'
})
export class ReferentialService {

  public resourceUrl = SERVER_API_URL + 'api/referentials';

  constructor(protected http: HttpClient) { }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http
      .get<any>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: any) => res));
  }

  getMedaillesForSelect(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http
      .get<any>(this.resourceUrl.concat('/medailles'), { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getAllPieceJointes(idMvt: number, typeMvt: string): Observable<any> {
    return this.http
      .get<any>(`${SERVER_API_URL}api/mouvements/${idMvt}/${typeMvt}/piece-jointes`, { params: new HttpParams(), observe: 'response' })
      .pipe(map((res: HttpResponse<IPieceJointe[]>) => this.convertDateArrayFromServer(res)));
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
