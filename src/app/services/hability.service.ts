import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hability } from '../models/hability';

@Injectable({
  providedIn: 'root'
})
export class HabilityService {

  private apiUrl = 'http://localhost:9091/api/hability';

  constructor(
    private http: HttpClient
  ) { }

}
