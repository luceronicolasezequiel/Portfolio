import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyect } from '../models/proyect';
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
}
