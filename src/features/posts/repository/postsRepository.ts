import {PostDbModel} from '../../../common/types/db/post-db.model'
import {db} from "../../../common/module/db/db"
import {ObjectId} from "mongodb"
import {UpdatePostInputModel} from "../types/input/update-post-input.type";

const postsCollection = db.getCollections().postsCollection;
export const postsRepository = {
    async createPost(post: PostDbModel) {
        const result = await postsCollection.insertOne(post)
        return result.insertedId.toString() // return _id -objectId
    },
    async findPostById(id: string) {
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return null
        return postsCollection.findOne({ _id: new ObjectId(id) })
    },
    async deletePost(id: ObjectId) {
        const result = await postsCollection.deleteOne({ _id: id })
        return result.deletedCount > 0
    },
    async updatePost(post: UpdatePostInputModel&{blogName:string}, id: string) {
        const filter = { _id: new ObjectId(id) }
        const updater = { $set: { ...post }}
        const result = await postsCollection.updateOne( filter, updater );
        return result.modifiedCount > 0;
    },
}