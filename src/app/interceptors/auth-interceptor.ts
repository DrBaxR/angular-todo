import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('login') || req.url.includes('logout')) {
      return next.handle(req);
    }

    req = req.clone({
      setHeaders: {
        Authorization: 'Basic ' + localStorage.getItem('token')
      }
    });

    return next.handle(req);
  }
}
