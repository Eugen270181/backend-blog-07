import {Request, Response} from 'express'
import {UpdatePostInputModel} from "../types/input/update-post-input.type";
import {postsServices} from "../services/postsServices";

export const putPostController = async (req: Request<{id: string}, any, UpdatePostInputModel>, res: Response) => {
    const updateResult = await postsServices.updatePost(req.body,req.params.id)
    if(!updateResult) return res.sendStatus(404)
    return res.sendStatus(204)
}