import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateHabilityRequest, Hability, UpdateHabilityRequest } from '../models/hability';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HabilityService {

  private API_URL = '/hability';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getAll(): Observable<Hability[]> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/getAll';

    return this.http.get<Hability[]>(endpointUrl, { headers: this.globalService.getHeadersWithOutToken() });
  }
  
  create(request: CreateHabilityRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/create';

    const observable = new Observable(observer => {
      this.http.post<Hability>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

  update(request: UpdateHabilityRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/update';

    const observable = new Observable(observer => {
      this.http.put<Hability>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

}
