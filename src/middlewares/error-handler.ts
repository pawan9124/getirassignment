import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error-handlers/custom-errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        //checking if the instance is of CustomError then send custom error
        return res.status(err.statusCode).send({ errors: err.serializeError() });
    }
    console.error("Here is the errro",err);
    res.status(400).send({
        errors: [{
            message: 'Something went wrong'
        }]
    });
};