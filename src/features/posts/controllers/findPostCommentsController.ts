import {Request, Response} from 'express'
import {commentsQueryRepository} from "../../comments/repositories/commentsQueryRepository";
import {inputQuerySanitizer} from "../../../common/module/inputQuerySanitizer";
import {validQueryType} from "../../../common/types/valid-query-type";
import {anyQueryType} from "../../../common/types/any-query-type";
import {pagCommentOutputModel} from "../../comments/types/output/pag-comment-output.type";
import {postsRepository} from "../repository/postsRepository";

export const findPostCommentsController = async (req:Request, res:Response<pagCommentOutputModel>) => {
    const postId = req.params.id
    const foundPost = await postsRepository.findPostById(postId)
    if (!foundPost) {
        res.sendStatus(404)
        return
    }
    const sanitizedQuery:validQueryType = inputQuerySanitizer(req.query as anyQueryType)
    const foundComments = await commentsQueryRepository.getCommentsAndMap(sanitizedQuery,postId)
    res.status(200).send(foundComments)
    return
}