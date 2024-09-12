import {Request, Response} from 'express'
import {usersServices} from "../services/usersServices";


export const delUserController = async (req: Request<{id: string}>, res: Response) => {
    const deleteResult = await usersServices.deleteUser(req.params.id)
    if(!deleteResult) return res.sendStatus(404)
    return  res.sendStatus(204)
}