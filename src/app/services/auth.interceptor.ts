import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const TOKEN_HEADER = 'Authorization';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    let authReq = httpRequest;
    if (token != null) {
      console.log("Inside interceptor");

      authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
  }
]
