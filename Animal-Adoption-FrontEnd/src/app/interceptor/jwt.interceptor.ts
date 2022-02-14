import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AccountService } from '../services/account/account.service';
import { User } from '../models/user';
import { catchError, finalize, map, take } from 'rxjs/operators';
import { ErrorCode } from '../models/enums/error-code';
import { Error } from '../models/error/error';
import { HttpStatusCode } from '../models/enums/http-status-code';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { ErrorCodeTranslationService } from 'src/locale/error-code-translation.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private snackbarService: SnackbarService, private errorCoddeTranslationService: ErrorCodeTranslationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let currentUser!: User;

    this.accountService.currentUser$.pipe(take(1))
      .subscribe(user => { currentUser = user });

    
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      

      catchError((errorResponse: HttpErrorResponse) => {
        const errorData: Error = {
        errorCode: ErrorCode.SomethingWentWrong,
        message: ''
        };
      if(errorResponse.status == HttpStatusCode.UNAUTHORIZED) {
        errorData.errorCode = ErrorCode.Unauthorized;
        this.accountService.logout();
      } else {
        errorData.errorCode = errorResponse.error.errorCode;
        errorData.message = errorResponse.error.message;
      }

      this.snackbarService.error(this.errorCoddeTranslationService.translate(errorData));

      return throwError(errorResponse);
      }),
      finalize(() => {})
    );
  }
}
