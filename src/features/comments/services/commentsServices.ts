import {commentsRepository} from "../repositories/commentsRepository";
import {ObjectId} from "bson";
import {CreateCommentInputModel} from "../types/input/create-comment-input.model";
import {CommentDbModel} from "../../../common/types/db/comment-db.model";
import {UpdateCommentInputModel} from "../types/input/update-comment-input.model";
import {usersRepository} from "../../users/repositories/usersRepository";
import {StatusCode} from "../../../common/types/enum/result-StatusCode-type";


//TODO:update delete with diff statuscode
export const commentsServices = {
    async createComment(commentInput: CreateCommentInputModel, postId:string, userId:string) {
        const user=await usersRepository.getUserById(userId)
        const {content} = commentInput
        const newComment:CommentDbModel = {
            content,
            commentatorInfo:{userId:user!._id.toString(),userLogin:user!.login},
            createdAt: new Date().toISOString(),
            postId
        }
        const newCommentId = await commentsRepository.createComment(newComment)
        return newCommentId
    },
    async deleteComment(id:string, userId:string):Promise<StatusCode>{
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return 0
        const comment=await commentsRepository.findCommentById(id)
        if (!comment) return 0
        if (comment.commentatorInfo.userId!==userId) return StatusCode.Forbidden
        const isDeleted = await commentsRepository.deleteComment(new ObjectId(id))
        return isDeleted?1:0
    },
    async updateComment(commentInput: UpdateCommentInputModel, id: string, userId:string):Promise<StatusCode> {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return StatusCode.NoSuccess
        const comment=await commentsRepository.findCommentById(id)
        if (!comment) return StatusCode.NoSuccess
        if (comment.commentatorInfo.userId!==userId) return StatusCode.Forbidden
        const {content} = commentInput
        const isUpdated = await commentsRepository.updateComment({content},id)
        return isUpdated?StatusCode.Success:StatusCode.NoSuccess
    },
}