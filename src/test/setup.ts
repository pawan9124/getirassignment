import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';

//Declaring the variable required to configuration
let mongoClient:MongoClient;
let mongo:MongoMemoryServer;
let database: Db;


//this hook will run before all the hooks
//here we are connecting to the in memory mongo server for testing purpose

jest.mock('../mongohelper');

beforeAll( async ()=>{
    //setting the environment before the hook run
     mongo = new MongoMemoryServer();
     await mongo.start();
    const mongoUri = await mongo.getUri(); //get the uri from the in memory server
    console.log('xxxx',mongoUri);
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
    database = mongoClient.db('getir-case-study');
})

// this hook will run before each test
beforeEach(async ()=>{
    //here we are clearing the data from the documents before running our tests
    const collection = await database.collection('records');
    await collection.deleteMany({});

})

//After all tests are run, need to close the connection

afterAll(async ()=>{
    await mongo.stop();
    await mongoClient.close();
});

export { database};