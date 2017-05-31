import { ErrorCode } from '../enums/error-code.enum';
export class Error{
    constructor(public errorCode:ErrorCode, public message:string, public obj:any=null){}
}