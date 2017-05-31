import { StatusCode } from '../enums/status-code.enum';
export class Result<U>{
    constructor(value:U = null, statusCode:StatusCode=StatusCode.Ok, errors: Error[]=null){}

}