import {commentatorInfo} from "../../../../common/types/db/commentDb.model";

export type CommentOutputModel = {
    id:string
    content: string
    commentatorInfo: commentatorInfo
    createdAt: string
}