import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/Experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl = 'http://localhost:5000/experiences';

  constructor(
    private http: HttpClient
  ) { }

  getExperiences(): Observable<Experience[]> {
    // example of getting list with json-server run
    return this.http.get<Experience[]>(this.apiUrl);
  }

}
