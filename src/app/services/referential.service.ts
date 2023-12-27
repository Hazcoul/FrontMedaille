import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request.util';

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

}
