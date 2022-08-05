import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalInformation } from '../models/personal-information';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  private API_URL = '/personalInformation';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getOne(): Observable<PersonalInformation> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/getOne';

    return this.http.get<PersonalInformation>(endpointUrl, { headers: this.globalService.getHeadersWithOutToken() });
  }
}
