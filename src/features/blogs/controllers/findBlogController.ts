import {Request, Response} from 'express'
import {BlogOutputModel} from "../types/output/blog-output.type";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";

export const findBlogController = async (req: Request<{id: string}>, res: Response<BlogOutputModel | {}>) => {
    const blogId = req.params.id
    const foundBlog = await blogsQueryRepository.findBlogAndMap(blogId)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundBlog)
}