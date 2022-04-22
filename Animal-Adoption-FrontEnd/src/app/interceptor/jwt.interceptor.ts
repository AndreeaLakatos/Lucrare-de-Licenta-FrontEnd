import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AccountService } from '../services/account/account.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { ErrorCode } from '../models/enums/error-code';
import { Error } from '../models/error/error';
import { HttpStatusCode } from '../models/enums/http-status-code';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { ErrorCodeTranslationService } from 'src/locale/error-code-translation.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private snackbarService: SnackbarService,
    private errorCoddeTranslationService: ErrorCodeTranslationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.accountService.isUserLoggedIn())
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),

      catchError((errorResponse: HttpErrorResponse) => {
        const errorData: Error = {
          errorCode: ErrorCode.SomethingWentWrong,
          message: '',
        };
        if (errorResponse.status == HttpStatusCode.UNAUTHORIZED) {
          errorData.errorCode = ErrorCode.Unauthorized;
          this.accountService.logout();
        } else {
          errorData.errorCode = errorResponse.error.errorCode;
          errorData.message = errorResponse.error.message;
        }

        this.snackbarService.error(
          this.errorCoddeTranslationService.translate(errorData)
        );

        return throwError(errorResponse);
      }),
      finalize(() => {})
    );
  }
}
