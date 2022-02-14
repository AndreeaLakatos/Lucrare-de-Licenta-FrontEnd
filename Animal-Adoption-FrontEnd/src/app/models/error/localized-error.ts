import { ErrorCode } from "../enums/error-code";

export interface LocalizedError {
    errorCode: ErrorCode;
    localizedMessage: string;
}