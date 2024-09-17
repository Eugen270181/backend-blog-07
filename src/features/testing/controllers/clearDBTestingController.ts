import {Response, Request} from 'express'
import {db} from "../../../common/module/db/db";
export const clearDBTestingController = async (req: Request, res: Response) => {
    await db.drop();
    res.sendStatus(204)
}