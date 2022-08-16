import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEducationRequest, Education, UpdateEducationRequest } from '../models/education';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private API_URL = '/education';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getAll(): Observable<Education[]> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/getAll';

    return this.http.get<Education[]>(endpointUrl, { headers: this.globalService.getHeadersWithOutToken() });
  }

  create(request: CreateEducationRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/create';

    const observable = new Observable(observer => {
      this.http.post<Education>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

  update(request: UpdateEducationRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/update';

    const observable = new Observable(observer => {
      this.http.put<Education>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

}
