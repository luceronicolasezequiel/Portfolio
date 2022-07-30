import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalInformation } from '../models/personal-information';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  private apiUrl = 'http://localhost:9091/api/personalInformation';

  constructor(
    private http: HttpClient
  ) { }

  getOne(): Observable<PersonalInformation> {
    let endpointUrl = this.apiUrl + '/getOne';

    return this.http.get<PersonalInformation>(endpointUrl);
  }
}
