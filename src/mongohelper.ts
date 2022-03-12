import { Db, MongoClient } from "mongodb";

let mongoClient: MongoClient;
let dbInstance: Db;



export const connectToDatabase = async () => {
    //connecting to the database here 
    mongoClient = new MongoClient(process.env.MONGO_URI || '');
    await mongoClient.connect();
    let db = await mongoClient.db(process.env.DATABASE_NAME);
    dbInstance = db;
    console.log("Connected to the mongodb");
    return db;
}

export const getDbInstance = () => {
    return dbInstance;
}