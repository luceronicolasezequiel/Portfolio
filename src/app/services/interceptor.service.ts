import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // intercept capture http request
    var currentUser = this.authService.currentUserAuthenticated; // get current user authenticated
    if(currentUser?.accessToken) { // if current user have accessToken property
      req = req.clone({ // clone http request intercepted and add in section header the accessToken
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      });
    }
    console.log('Interceptor is runnning ' + JSON.stringify(currentUser));
    return next.handle(req); // allow it to continue its course
  }

}
