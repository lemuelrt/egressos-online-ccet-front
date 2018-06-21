import { EOCCET_BASE_API } from './../app.api';
import { LocalUser } from './../models/local-user.model';
import { AuthService } from './../services/auth.service';
import { StorageService } from './../services/storage.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService, public auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localUser = this.storage.getLocalUser();

    const N = EOCCET_BASE_API.length;
    const requestToAPI = req.url.substring(0, N) === EOCCET_BASE_API;

    if (localUser && requestToAPI) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
