import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';
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

}
