import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL = '/task';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getByExperience(experienceId: number): Observable<Task[]> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/getByExperience/' + experienceId;
    
    const observable = new Observable<Task[]>(observer => {
      this.http.get<Task[]>(endpointUrl, { headers: this.globalService.getHeadersWithOutToken() })
      .subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
    
    return observable;
  }

}
