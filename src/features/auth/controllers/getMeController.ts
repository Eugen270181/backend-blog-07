import {Response, Request} from 'express'
import {MeOutputModel} from "../types/output/me-output.model";
import {usersQueryRepository} from "../../users/repositories/usersQueryRepository";


export const getMeController = async (req: Request, res: Response<MeOutputModel|{}>) => {
    //TODO:release it
    const userId = req.user.userId!
    const meViewObject = await usersQueryRepository.getMapMe(userId)
    const result = meViewObject?meViewObject:{}
    res.status(200).send(result)
    return
}