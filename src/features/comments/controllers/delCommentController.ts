import {Request, Response} from 'express'
import {commentsServices} from "../services/commentsServices";
import {ResultStatus} from "../../../common/types/enum/resultStatus";
import {HttpStatus} from "../../../common/types/enum/httpStatus";


export const delCommentController = async (req: Request<{id: string}>, res: Response) => {
    //TODO: RELEASE OBJECT RESULT WITH RETURN AND SEND REQ.USER
    const userId = req.user.userId!
    const commentId = req.params.id
    const deleteResult = await commentsServices.deleteComment(commentId,userId)
    if (deleteResult === ResultStatus.NotFound) return res.sendStatus(HttpStatus.NotFound)
    if (deleteResult === ResultStatus.Forbidden) return res.sendStatus(HttpStatus.Forbidden)
    if (deleteResult === ResultStatus.CancelledAction) return res.sendStatus(HttpStatus.InternalServerError)

    return  res.sendStatus(HttpStatus.NoContent)
}