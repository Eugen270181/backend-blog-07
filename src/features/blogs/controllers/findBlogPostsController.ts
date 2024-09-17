import {Request, Response} from 'express'
import {postsQueryRepository} from "../../posts/repository/postsQueryRepository";
import {pagPostOutputModel} from "../../posts/types/output/pag-post-output.type";
import {validQueryType} from "../../../common/types/validQuery.type";
import {inputQuerySanitizer} from "../../../common/module/inputQuerySanitizer";
import {anyQueryType} from "../../../common/types/anyQuery.type";
import {blogsRepository} from "../repositories/blogsRepository";

export const findBlogPostsController = async (req: Request<{id: string}>, res: Response<pagPostOutputModel>) => {
    const blogId = req.params.id
    const foundBlog = await blogsRepository.findBlogById(blogId)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    const sanitizedQuery:validQueryType = inputQuerySanitizer(req.query as anyQueryType)
    const getPosts = await postsQueryRepository.getPostsAndMap(sanitizedQuery,blogId)
    res.status(200).send(getPosts)
}