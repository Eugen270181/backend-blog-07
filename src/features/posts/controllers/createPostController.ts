import {Response, Request} from 'express'
import {CreatePostInputModel} from "../types/input/create-post-input.type";
import {PostOutputModel} from "../types/output/post-output.type";
import {postsServices} from "../services/postsServices";
import {postsQueryRepository} from "../repository/postsQueryRepository";

export const createPostController = async (req: Request<any, any, CreatePostInputModel>, res: Response<PostOutputModel>) => {
    const newPostId = await postsServices.createPost(req.body)
    const newPost = await postsQueryRepository.findPostAndMap(newPostId)

    if (!newPost) {
        console.log('пост был создан, но не найден')
        res.sendStatus(504)
        return
    }
    res.status(201).send(newPost)
}