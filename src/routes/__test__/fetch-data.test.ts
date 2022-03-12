import request from 'supertest';
import { app } from '../../app';



it('should return 400 if the startDate is not passed', async () => {
    const filterData = {
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    };

    await request(app)
        .post('/api/fetchdata')
        .send(filterData)
        .expect(400);
});

it('should return 400 if the minCount is not a number', async () => {
    const filterData = {
        "endDate": "2018-02-02",
        "minCount": '2700',
        "maxCount": 3000
    };

    await request(app)
        .post('/api/fetchdata')
        .send(filterData)
        .expect(400);
});

it('should return 200 the records based on the filters is correct', async () => {


    const filterData = {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    };

    await request(app)
        .post('/api/fetchdata')
        .send(filterData)
        .expect(200);
});