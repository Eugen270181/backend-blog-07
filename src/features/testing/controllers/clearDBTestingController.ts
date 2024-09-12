import {Response, Request} from 'express'
import {testingRepository} from '../repository/testingRepository'
export const clearDBTestingController = async (req: Request<{id: string}>, res: Response) => {
    await testingRepository.clearDB()
    res.sendStatus(204)
}