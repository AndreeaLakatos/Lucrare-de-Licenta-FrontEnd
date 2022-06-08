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

    const localizedMessages: LocalizedError[] = [
      {
        errorCode: ErrorCode.InvalidUsernameOrPassword,
        localizedMessage: $localize`:@@invalidUsernameOrPassword: Invalid username or password!`
      },
      {
        errorCode: ErrorCode.UserAlreadyExist,
        localizedMessage: $localize`:@@userAlreadyExists: There is already an user with this username!`
      },
      {
        errorCode: ErrorCode.AnnouncementWithRequests,
        localizedMessage: $localize`:@@announcementWithRequests: You can not delete this announcement because already has requests!`
      },
      {
        errorCode: ErrorCode.InvalidEmailAddress,
        localizedMessage: $localize`:@@invalidEmailAddress: Invalid email address!`
      },
      {
        errorCode: ErrorCode.UserEmailAlreadyExists,
        localizedMessage: $localize`:@@userEmailAlreadyExists: There is already an user with this email!`
      },
    ];

    const newMessage: LocalizedError | any = localizedMessages.find((x) => x.errorCode === errorCode);
    if(newMessage) {
      return newMessage.localizedMessage;
    } else {
      return $localize`:@@undefinedError: Something wrong happened!`;
    }
  }
}
