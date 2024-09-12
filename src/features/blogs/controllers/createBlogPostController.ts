import {Response, Request} from 'express'
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {CreateBlogPostInputModel} from "../../posts/types/input/create-blog-post-input.type";
import {PostOutputModel} from "../../posts/types/output/post-output.type";
import {postsQueryRepository} from "../../posts/repository/postsQueryRepository";
import {postsServices} from "../../posts/services/postsServices";



export const createBlogPostController = async (req: Request<{id:string}, any, CreateBlogPostInputModel>, res: Response<PostOutputModel>) => {
    const blogId = req.params.id
    const foundBlog = await blogsQueryRepository.findBlogById(blogId)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    const newPostId = await postsServices.createPost({...req.body,blogId})
    const newPost = await postsQueryRepository.findPostAndMap(newPostId)

    if (!newPost) {
        console.log('пост был создан, но не найден')
        res.sendStatus(504)
        return
    }
    res.status(201).send(newPost)
}