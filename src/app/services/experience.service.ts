import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateExperienceRequest, Experience, UpdateExperienceRequest } from '../models/experience';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private API_URL = '/experience';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getAll(): Observable<Experience[]> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/getAll';

    return this.http.get<Experience[]>(endpointUrl, { headers: this.globalService.getHeadersWithOutToken() });
  }

  create(request: CreateExperienceRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/create';
    
    const observable = new Observable(observer => {
      this.http.post<Experience>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });
    
    return observable;
  }

  update(request: UpdateExperienceRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/update';
    
    const observable = new Observable(observer => {
      this.http.put<Experience>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });
    
    return observable;
  }

}
