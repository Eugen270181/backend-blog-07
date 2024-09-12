import {Request, Response} from 'express'
import {UpdateBlogInputModel} from "../types/input/update-blog-input.type";
import {blogsServices} from "../services/blogsServices";

export const putBlogController = async (req: Request<{id: string}, any, UpdateBlogInputModel>, res: Response) => {
    const updateResult = await blogsServices.updateBlog(req.body,req.params.id)
    if(!updateResult) return res.sendStatus(404)
    return res.sendStatus(204)
}