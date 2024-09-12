import {commentatorInfo} from "../../../../common/types/db/comment-db.model";

export type CommentOutputModel = {
    id:string
    content: string
    commentatorInfo: commentatorInfo
    createdAt: string
}