import { Injectable } from '@angular/core';
import { ErrorCode } from 'src/app/models/enums/error-code';
import { LocalizedError } from 'src/app/models/error/localized-error';
import { Error } from '../app/models/error/error'

@Injectable({
  providedIn: 'root'
})
export class ErrorCodeTranslationService {
  constructor() { }

  public translate(error: Error){
    const {errorCode, message} = { ...error };
    console.log(errorCode);

    const localizedMessages: LocalizedError[] = [
      {
        errorCode: ErrorCode.InvalidUsernameOrPassword,
        localizedMessage: $localize`:@@invalidUsernameOrPassword: Invalid username or password!`
      },
      {
        errorCode: ErrorCode.UserAlreadyExist,
        localizedMessage: $localize`:@@userAlreadyExists: User already exists!`
      }
    ];

    const newMessage: LocalizedError | any = localizedMessages.find((x) => x.errorCode === errorCode);
    if(newMessage) {
      return newMessage.localizedMessage;
    } else {
      return $localize`:@@undefinedError: Something wrong happened!`;
    }
  }
}
