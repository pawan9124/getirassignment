import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; //this will allow the async to be used inside new Error to be thrown inside the middlewares
import { json } from 'body-parser';
import cors from 'cors';
import { NotFoundError } from './error-handlers/not-found-errors';
import { errorHandler } from './middlewares/error-handler';
import { fetchDataRouter } from './routes/fetch-data';


const app = express();

app.use(json()); //use of content-type application/json
app.use(cors()); //use of cross-origin to allow other origin to reach out app

app.use(fetchDataRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    throw new NotFoundError()
});

//handle the error thrown inside middlewares
app.use(errorHandler);

export { app };