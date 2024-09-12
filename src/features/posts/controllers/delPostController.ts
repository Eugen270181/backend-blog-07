import {Request, Response} from 'express'
import {postsServices} from "../services/postsServices";

export const delPostController = async (req: Request, res: Response) => {
    const deleteResult = await postsServices.deletePost(req.params.id)
    if(!deleteResult) return res.sendStatus(404)
    return res.sendStatus(204)
}