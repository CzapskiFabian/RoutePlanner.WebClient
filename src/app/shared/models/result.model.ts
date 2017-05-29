import { StatusCode } from '../enums/status-code.enum';
export class Result<U>{
    constructor(statusCode:StatusCode, value:U = null){}

}