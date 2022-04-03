import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hability } from '../models/Hability';

@Injectable({
  providedIn: 'root'
})
export class HabilityService {

  private apiUrl = 'http://localhost:5000/habilitys';

  constructor(
    private http: HttpClient
  ) { }

  getHabilitys(): Observable<Hability[]> {
    return this.http.get<Hability[]>(this.apiUrl);
  }
}
