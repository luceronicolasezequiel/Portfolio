import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { LoginResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = '/auth';

  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn() { return this.loggedIn.asObservable(); }

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  login(request: User): Observable<any> {
    let endpointUrl = this.globalService.getApiUrl() + this.API_URL + '/login';
    
    return this.http.post<LoginResponse>(endpointUrl, request, { headers: this.globalService.getHeadersWithOutToken() })
      .pipe(map(data => {
        this.globalService.setUsername(data.username);
        this.globalService.setAccessToken(data.accessToken);
        
        this.loggedIn.next(true);      
        
        return data;
      }));
  }

  logout() {
    this.globalService.removeUsername();
    this.globalService.removeAccessToken();
    
    this.loggedIn.next(false);
  }

}
