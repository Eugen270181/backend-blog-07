import {Request, Response} from 'express'
import {commentsServices} from "../services/commentsServices";


export const delCommentController = async (req: Request<{id: string}>, res: Response) => {
    //TODO: RELEASE OBJECT RESULT WITH RETURN AND SEND REQ.USER
    const userId = req.user.userId!
    const commentId = req.params.id
    const deleteResult = await commentsServices.deleteComment(commentId,userId)
    if(!deleteResult) return res.sendStatus(404)
    if (deleteResult===2) return res.sendStatus(403)
    return  res.sendStatus(204)
}