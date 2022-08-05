import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../models/education';
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
}
