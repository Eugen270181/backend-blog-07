import {commentsRepository} from "../repositories/commentsRepository";
import {ObjectId} from "bson";
import {CreateCommentInputModel} from "../types/input/create-comment-input.model";
import {CommentDbModel} from "../../../common/types/db/commentDb.model";
import {UpdateCommentInputModel} from "../types/input/update-comment-input.model";
import {usersRepository} from "../../users/repositories/usersRepository";
import {ResultStatus} from "../../../common/types/enum/resultStatus";


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
    async deleteComment(id:string, userId:string):Promise<ResultStatus>{
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return ResultStatus.NotFound
        const comment=await commentsRepository.findCommentById(id)
        if (!comment) return ResultStatus.NotFound
        if (comment.commentatorInfo.userId!==userId) return ResultStatus.Forbidden
        const isDeleted = await commentsRepository.deleteComment(new ObjectId(id))
        return isDeleted?ResultStatus.Success:ResultStatus.CancelledAction
    },
    async updateComment(commentInput: UpdateCommentInputModel, id: string, userId:string):Promise<ResultStatus> {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return ResultStatus.BadRequest
        const comment=await commentsRepository.findCommentById(id)
        if (!comment) return ResultStatus.NotFound
        if (comment.commentatorInfo.userId!==userId) return ResultStatus.Forbidden
        const {content} = commentInput
        const isUpdated = await commentsRepository.updateComment({content},id)
        return isUpdated?ResultStatus.Success:ResultStatus.CancelledAction
    },
}