import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTaskRequest, DeleteTaskRequest, Task, UpdateTaskRequest } from '../models/task';
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
        }
      );
    });

    return observable;
  }

  create(request: CreateTaskRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/create';

    const observable = new Observable(observer => {
      this.http.post<Task>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

  update(request: UpdateTaskRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/update';

    const observable = new Observable(observer => {
      this.http.put<Task>(endpointUrl, request, { headers: this.globalService.getHeadersWithToken() }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

  delete(request: DeleteTaskRequest): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/delete';

    const httpOptions = {
      headers: this.globalService.getHeadersWithToken(),
      body: request
    };

    const observable = new Observable(observer => {
      this.http.delete<any>(endpointUrl, httpOptions)
      .subscribe(
        response => {
          observer.next(response);
          observer.complete();
        }
      );
    });

    return observable;
  }

}
