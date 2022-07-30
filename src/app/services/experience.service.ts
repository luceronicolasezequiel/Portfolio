import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Experience } from '../models/Experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl = 'http://localhost:9091/api/experience';

  constructor(
    private http: HttpClient
  ) { }

  getExperiences(): Observable<Experience[]> {
    let endpointUrl = this.apiUrl + '/getAll';

    return this.http.get<Experience[]>(endpointUrl);
  }

}
