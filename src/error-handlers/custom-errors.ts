/* 
    Custom Error to provide the same structure for the errors send back to the users.
*/

export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message:string){
        super(message);

        //used to set the prototype of builtin Error to the CustomError
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeError(): {message:string, filed?:string}[]
}