import {Request, Response} from 'express'
import {commentsServices} from "../services/commentsServices";
import {OutputErrorsType} from "../../../common/types/output-errors-type";
import {CreateCommentInputModel} from "../types/input/create-comment-input.model";
import {CommentOutputModel} from "../types/output/comment-output.type";
import {StatusCode} from "../../../common/types/enum/result-StatusCode-type";


export const updateCommentController = async (req: Request<any, any, CreateCommentInputModel>, res: Response<CommentOutputModel|OutputErrorsType>) => {
    //TODO: RELEASE OBJECT RESULT WITH RETURN AND SEND REQ.USER
    const userId = req.user.userId!
    const commentId = req.params.id
    const {content} = req.body

    const updateResult = await commentsServices.updateComment({content},commentId,userId)
    if (!updateResult) return res.sendStatus(404)
    if (updateResult===StatusCode.Forbidden) return res.sendStatus(403)

    return res.sendStatus(204)
};