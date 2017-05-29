import { ErrorCode } from '../enums/error-code.enum';


export class ErrorCodesHandler {
    static getErrorMessage(code: ErrorCode) {
        switch (code) {
            case ErrorCode.LatitudeOutOfRange:
                return 'Value must be between -90 and 90';
            case ErrorCode.LatitudeOutOfRange:
                return 'Value must be between -180 and 180';
            case ErrorCode.DuplicateEngineerId:
                return 'Id must be unique';
            case ErrorCode.DuplicateJobId:
                return 'Id must be unique';
            default:
                return 'Not Implemented error code: ' + code.toString();
        }
    }
}