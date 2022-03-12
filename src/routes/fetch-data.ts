import express, { Request, Response } from 'express';
import { body } from "express-validator";
import { BadRequestError } from '../error-handlers/bad-request-errors';
import { validateRequest } from '../middlewares/validate-request';
import { getDbInstance } from '../mongohelper';

/* 
    Request validator check the body params request and send the error;
*/

const router = express.Router();


router.post('/api/fetchdata', [
    body('startDate')
        .trim()
        .notEmpty(),
    body('endDate')
        .trim()
        .notEmpty(),
    body('minCount')
        .trim()
        .notEmpty(),
    body('maxCount')
        .trim()
        .notEmpty(),
],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const db = getDbInstance();
            let { startDate, endDate, minCount, maxCount } = req.body;
            minCount = parseInt(minCount);
            maxCount = parseInt(maxCount);
            const aggregation = [{
                "$addFields": {
                    totalCount: { $sum: "$counts" }
                }
            },
            {
                "$match": {
                    "createdAt": { $gte: new Date(startDate), $lte: new Date(endDate) },
                    "totalCount": { $gte: minCount, $lte: maxCount }
                }
            },
            {
                "$project": {
                    _id: 0,
                    key: "$key",
                    createdAt: "$createdAt",
                    totalCount: "$totalCount",
                }
            }
            ]
            const data = await db.collection('records').aggregate(aggregation).toArray();
            res.status(200).send({
                code: 0,
                msg: 'Success',
                records: data
            });
        } catch (err) {
            console.log(err);
            throw new BadRequestError('Something went wrong')
        }
    }
);


export { router as fetchDataRouter };