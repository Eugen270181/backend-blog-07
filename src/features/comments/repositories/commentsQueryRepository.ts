import {db} from "../../../common/module/db/db"
import {ObjectId, WithId} from "mongodb"
import {validQueryType} from "../../../common/types/validQuery.type";
import {CommentOutputModel} from "../types/output/comment-output.type";
import {CommentDbModel} from "../../../common/types/db/comment-db.model";
import {pagCommentOutputModel} from "../types/output/pag-comment-output.type";

const commentsCollection = db?.getCollections().commentsCollection;
export const commentsQueryRepository = {
    async findCommentById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return commentsCollection.findOne({ _id: new ObjectId(id) });
    },
    async findCommentAndMap(id: string) {
        const comment = await this.findCommentById(id)
        return comment?this.map(comment):null
    },
    async getCommentsAndMap(query:validQueryType,postId?:string):Promise<pagCommentOutputModel> {
        const search = postId?{postId:postId}:{}
        try {
            const comments = await commentsCollection
                .find(search)
                .sort(query.sortBy,query.sortDirection)
                .skip((query.pageNumber-1)*query.pageSize)
                .limit(query.pageSize)
                .toArray()
            const totalCount = await commentsCollection.countDocuments(search)
            return {
                pagesCount: Math.ceil(totalCount/query.pageSize),
                page: query.pageNumber,
                pageSize:query.pageSize,
                totalCount,
                items:comments.map(this.map)
            }
        }
        catch(e){
            console.log(e)
            throw new Error(JSON.stringify(e))
        }

    },
    map(comment:WithId<CommentDbModel>):CommentOutputModel{
        const { _id, postId,...commentForOutPut} = comment;//деструктуризация
        return {id:comment._id.toString(),...commentForOutPut}
    },
}
