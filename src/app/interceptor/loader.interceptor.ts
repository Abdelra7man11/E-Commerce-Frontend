// The OLd Version Interceptor

import { Injectable } from '@angular/core';
import { LoaderService } from '../loader.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

// import { HttpInterceptorFn } from '@angular/common/http';

// export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this._loaderService.showLoader();
    return next.handle(request).pipe(
      finalize(() => {
        this._loaderService.hideLoader();
      }),
    );
  }
}
