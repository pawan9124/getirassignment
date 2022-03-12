import { ValidationError } from 'express-validator'; //type to assign the Validation Error in typescript to errors so it must be type error from validaitonError object
import { CustomError } from './custom-errors';

export class RequestValidationError extends CustomError {
   
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super('Invalid request error');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError(){
        return this.errors.map(error=>{
            return {message:error.msg, field:error.param}
        })
    }

}


