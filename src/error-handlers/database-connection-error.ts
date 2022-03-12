import { CustomError } from "./custom-errors";
export class DatabaseConnectionError extends CustomError {
    reason = "Error connecting to database";
    statusCode = 500;

    constructor(){
        super('Error connecting to the database');
        //set this property to the built in class fo Error
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError(){
        return [{message:this.reason}]
    }

}