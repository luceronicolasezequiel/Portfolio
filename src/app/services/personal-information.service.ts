import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalInformation, UpdateFullnameAndTitleRequest, UpdateProfileRequest, UpdateSummaryRequest } from '../models/personal-information';
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

  updateFullnameAndTitle(request: UpdateFullnameAndTitleRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/updateFullnameAndTitle';
    
    const observable = new Observable(observer => {
      this.http.put<PersonalInformation>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });
    
    return observable;
  }

  updateProfile(request: UpdateProfileRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/updateProfile';
    
    const formData: FormData = new FormData();
    formData.append('id', request.id.toString());
    formData.append('profile', request.profile, request.profile?.name);

    const observable = new Observable(observer => {
      this.http.put<PersonalInformation>(endpointUrl, formData, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });
    
    return observable;
  }


  updateSummary(request: UpdateSummaryRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/updateSummary';
    
    const observable = new Observable(observer => {
      this.http.put<PersonalInformation>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });
    
    return observable;
  }

}
