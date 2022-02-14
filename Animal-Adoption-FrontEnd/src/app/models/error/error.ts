import { ErrorCode } from "../enums/error-code";

export interface Error {
    errorCode: ErrorCode;
    message: string;
}