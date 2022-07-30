import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl = 'http://localhost:9091/api/experience';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Experience[]> {
    let endpointUrl = this.apiUrl + '/getAll';

    return this.http.get<Experience[]>(endpointUrl);
  }

}
