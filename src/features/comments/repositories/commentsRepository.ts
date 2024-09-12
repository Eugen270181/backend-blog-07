import {blogCollection, commentCollection, userCollection} from "../../../common/module/db/dbMongo"
import {ObjectId,WithId} from "mongodb"
import {CommentDbModel} from "../../../common/types/db/comment-db.model";
import {UpdateCommentInputModel} from "../types/input/update-comment-input.model";


export const commentsRepository = {
    async createComment(comment:CommentDbModel):Promise<string> {
        const result = await commentCollection.insertOne(comment)
        return result.insertedId.toString() // return _id -objectId
    },
    async findCommentById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return commentCollection.findOne({ _id: new ObjectId(id) });
    },
    async deleteComment(id:ObjectId){
        const result = await commentCollection.deleteOne({ _id: id });
        return result.deletedCount > 0
    },
    async updateComment(comment:UpdateCommentInputModel, id:string) {
        const filter = { _id: new ObjectId(id) }
        const updater = { $set: { ...comment } }
        const result = await commentCollection.updateOne(filter, updater)
        return result.modifiedCount > 0
    },
}