import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProyectRequest, DeleteProyectRequest, Proyect, UpdateProyectRequest } from '../models/proyect';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  private API_URL = '/proyect';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }
  
  getAll(): Observable<Proyect[]> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/getAll';

    return this.http.get<Proyect[]>(endpointUrl, { headers: this.globalService.getHeadersWithOutToken() });
  }
  
  create(request: CreateProyectRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/create';

    const observable = new Observable(observer => {
      this.http.post<Proyect>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

  update(request: UpdateProyectRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/update';

    const observable = new Observable(observer => {
      this.http.put<Proyect>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

  delete(request: DeleteProyectRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/delete';

    const httpOptions = {
      headers: this.globalService.getHeadersWithToken(),
      body: request
    };

    const observable = new Observable(observer => {
      this.http.delete<any>(endpointUrl, httpOptions)
      .subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

}
