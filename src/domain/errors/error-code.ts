export enum ErrorCode {
    LatitudeOutOfRange,
    LongitudeOutOfRange
}

export class ErrorCodesHandler {
    static getErrorMessage(code: ErrorCode) {
        switch (code) {
            case ErrorCode.LatitudeOutOfRange:
                return 'Value must be between -90 and 90';
            case ErrorCode.LatitudeOutOfRange:
                return 'Value must be between -180 and 180';
            default:
                return 'Not Implemented error code: ' + code.toString();
        }
    }
}