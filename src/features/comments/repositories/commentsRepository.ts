import {db} from "../../../common/module/db/db"
import {ObjectId,WithId} from "mongodb"
import {CommentDbModel} from "../../../common/types/db/comment-db.model";
import {UpdateCommentInputModel} from "../types/input/update-comment-input.model";

const commentsCollection = db?.getCollections().commentsCollection;
export const commentsRepository = {
    async createComment(comment:CommentDbModel):Promise<string> {
        const result = await commentsCollection.insertOne(comment)
        return result.insertedId.toString() // return _id -objectId
    },
    async findCommentById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return commentsCollection.findOne({ _id: new ObjectId(id) });
    },
    async deleteComment(id:ObjectId){
        const result = await commentsCollection.deleteOne({ _id: id });
        return result.deletedCount > 0
    },
    async updateComment(comment:UpdateCommentInputModel, id:string) {
        const filter = { _id: new ObjectId(id) }
        const updater = { $set: { ...comment } }
        const result = await commentsCollection.updateOne(filter, updater)
        return result.modifiedCount > 0
    },
}