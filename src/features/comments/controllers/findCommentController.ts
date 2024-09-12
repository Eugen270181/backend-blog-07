import {Request, Response} from 'express'
import {CommentOutputModel} from "../types/output/comment-output.type";
import {commentsQueryRepository} from "../repositories/commentsQueryRepository";

export const findCommentController = async (req: Request<{id: string}>, res: Response<CommentOutputModel | {}>) => {
    const commentId = req.params.id
    const foundComment = await commentsQueryRepository.findCommentAndMap(commentId)
    if (!foundComment) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundComment)
}