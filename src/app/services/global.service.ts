import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private USER_NAME = 'userName';
  private ACCESS_TOKEN = 'accessToken';

  constructor() { }

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

  getHeadersWithOutToken(): HttpHeaders {
    return new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '-1'
    });
  }

  getHeadersWithToken(): HttpHeaders {
    return new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '-1',
      Authorization: 'Bearer ' + this.getAccessToken()
    });
  }

}