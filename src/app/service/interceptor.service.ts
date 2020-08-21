import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FacadeService } from './facade.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router, private facadeService: FacadeService) { }
  token: string;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.facadeService.getUserToken();
    if (this.token) {
      const updateRequest = req.clone({ headers: req.headers.set('token', this.token) });
      return next.handle(updateRequest).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.headers.get('Unauthorized')) {
            this.facadeService.userLoggedOut();
            this.router.navigateByUrl('login');
            this.facadeService.toaster('info', 'Please Login');
          }
        }
        return event;
      }));
    }
    return next.handle(req);
  }
}
