import 'dotenv/config'
import { app } from './app';
import { DatabaseConnectionError } from './error-handlers/database-connection-error';
import { connectToDatabase } from './mongohelper';

const port = process.env.NODE_ENV !== 'production' ? process.env.PORT : 8080;



const start = async () => {
    console.log("Starting the application!!")

    //Check if the mongo uri is not defined then Throw Error
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in the environment');
    }
    if (!process.env.DATABASE_NAME) {
        throw new Error('DATABASE_NAME is not defined in the environment');
    }
    try {
        connectToDatabase();
    } catch (err) {
        console.log(err);
        throw new DatabaseConnectionError();
    }
    app.listen(port, () => console.log("Giter app is listening on the port 3000!!!!!!!"));
}

start();

