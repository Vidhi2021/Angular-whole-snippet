import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthBodyInterceptor implements HttpInterceptor {
  logggedInUserEmail: string = '';
  logggedInUserProfile: string = '';
  token: string = '';

  constructor(private router: Router, private cookieService: CookieService) {
    this.logggedInUserEmail = this.cookieService.get('user_email');
    this.logggedInUserProfile = this.cookieService.get('user_role');
    this.token = this.cookieService.get('user_token');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.logggedInUserEmail = this.cookieService.get('user_email');
    this.logggedInUserProfile = this.cookieService.get('user_role');
    this.token = this.cookieService.get('user_token');
    if (req.headers.get('skip')) return next.handle(req);
    req = req.clone({
      headers: req.headers.set('AuthorizationToken', this.token),
      body: {
        ...req.body,
        check_email_id: this.logggedInUserEmail,
        check_role: this.logggedInUserProfile,
        check_token: this.token,
      },
    });
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse)
          if (evt.body)
            if (evt.body.reponse_code == '401')
              this.router.navigate(['logout']);
      })
    );
  }
}
