import {Request, Response} from 'express'
import {PostOutputModel} from "../types/output/post-output.type";
import {postsQueryRepository} from "../repository/postsQueryRepository";

export const findPostController = async (req: Request<{id: string}>, res: Response<PostOutputModel | {}>) => {
    const foundPost = await postsQueryRepository.findPostAndMap(req.params.id)
    if (!foundPost) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundPost)
}