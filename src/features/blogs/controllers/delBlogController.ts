import {Request, Response} from 'express'
import {blogsServices} from "../services/blogsServices";

export const delBlogController = async (req: Request<{id: string}>, res: Response) => {
    const deleteResult = await blogsServices.deleteBlog(req.params.id)
    if(!deleteResult) return res.sendStatus(404)
    return  res.sendStatus(204)
}