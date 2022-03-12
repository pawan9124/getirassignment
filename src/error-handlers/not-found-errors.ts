/* 
    Not found route error and handling the case for the error of the route not found
*/

import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError{
    statusCode = 404;

    constructor(){
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError(){
        return [{message:'Route not found'}]
    }
}