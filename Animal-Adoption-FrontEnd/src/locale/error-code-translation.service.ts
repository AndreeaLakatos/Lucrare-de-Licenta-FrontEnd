import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorCode } from 'src/app/models/enums/error-code';
import { LocalizedError } from 'src/app/models/error/localized-error';
import { Error } from '../app/models/error/error'

@Injectable({
  providedIn: 'root'
})
export class ErrorCodeTranslationService {
  constructor(private translateService: TranslateService) { }

  public translate(error: Error){
    const {errorCode, message} = { ...error };

    const localizedMessages: LocalizedError[] = [
      {
        errorCode: ErrorCode.UserAlreadyExist,
        localizedMessage: this.translateService.instant('userAlreadyExist')
      }
    ];

    const newMessage: LocalizedError | any = localizedMessages.find((x) => x.errorCode === errorCode);
    if(newMessage) {
      return newMessage.localizedMessage;
    } else {
      return this.translateService.instant('undefinedError');
    }
  }
}
