import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hability } from '../models/hability';
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
}
