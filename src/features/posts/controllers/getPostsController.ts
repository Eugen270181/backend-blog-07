import {Request, Response} from 'express'
import {postsQueryRepository} from "../repository/postsQueryRepository";
import {validQueryType} from "../../../common/types/valid-query-type";
import {inputQuerySanitizer} from "../../../common/module/inputQuerySanitizer";
import {anyQueryType} from "../../../common/types/any-query-type";
import {pagPostOutputModel} from "../types/output/pag-post-output.type";

export const getPostsController = async (req: Request, res: Response<pagPostOutputModel>) => {
    const sanitizedQuery:validQueryType = inputQuerySanitizer(req.query as anyQueryType)
    const foundPosts = await postsQueryRepository.getPostsAndMap(sanitizedQuery)
    res.status(200).send(foundPosts)
}