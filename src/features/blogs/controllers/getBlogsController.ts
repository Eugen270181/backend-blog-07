import {Request, Response} from 'express'
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {inputQuerySanitizer} from "../../../common/module/inputQuerySanitizer";
import {pagBlogOutputModel} from "../types/output/pag-blog-output.type";
import {validQueryType} from "../../../common/types/valid-query-type";
import {anyQueryType} from "../../../common/types/any-query-type";

export const getBlogsController = async (req:Request, res:Response<pagBlogOutputModel>) => {
    const sanitizedQuery:validQueryType = inputQuerySanitizer(req.query as anyQueryType)
    const foundBlogs = await blogsQueryRepository.getBlogsAndMap(sanitizedQuery)
    res.status(200).send(foundBlogs)
    return
}