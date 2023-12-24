import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetenteurService {

  public resourceUrl = SERVER_API_URL + 'api/detenteurs';

  constructor(protected http: HttpClient) {}

}
