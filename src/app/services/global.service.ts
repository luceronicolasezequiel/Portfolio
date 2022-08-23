import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private USER_NAME = 'userName';
  private ACCESS_TOKEN = 'accessToken';

  constructor(
    private datePipe: DatePipe
  ) { }

  getApiUrl(): string {
    return 'http://localhost:9091/api'; // https://portfolio-microservice.herokuapp.com/api
  }

  getHeadersWithOutToken(): HttpHeaders {
    return new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '-1'
    });
  }

  getHeadersWithToken(): HttpHeaders {
    return new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '-1',
      'Authorization': 'Bearer ' + this.getAccessToken()
    });
  }

  getUsername(): string | null {
    return window.localStorage.getItem(this.USER_NAME);
  }

  setUsername(userName: string) {
    window.localStorage.setItem(this.USER_NAME, userName);
  }

  removeUsername() {
    window.localStorage.removeItem(this.USER_NAME);
  }
  
  getAccessToken(): string | null {
    return window.localStorage.getItem(this.ACCESS_TOKEN);
  }

  setAccessToken(accessToken: string) {
    window.localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  removeAccessToken() {
    window.localStorage.removeItem(this.ACCESS_TOKEN);
  }

  parseDate(request: string): string | null {
    if (request) {
        const date = new Date(request);
        const response = this.datePipe.transform(date, 'yyyy-MM-dd');

        return response;
    }
    
    return null;
  }

}
