import {PostDbModel} from '../../../common/types/db/post-db.model'
import {postCollection} from "../../../common/module/db/dbMongo"
import {ObjectId} from "mongodb"
import {UpdatePostInputModel} from "../types/input/update-post-input.type";


export const postsRepository = {
    async createPost(post: PostDbModel) {
        const result = await postCollection.insertOne(post)
        return result.insertedId.toString() // return _id -objectId
    },
    async findPostById(id: string) {
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return null
        return postCollection.findOne({ _id: new ObjectId(id) })
    },
    async deletePost(id: ObjectId) {
        const result = await postCollection.deleteOne({ _id: id })
        return result.deletedCount > 0
    },
    async updatePost(post: UpdatePostInputModel&{blogName:string}, id: string) {
        const filter = { _id: new ObjectId(id) }
        const updater = { $set: { ...post }}
        const result = await postCollection.updateOne( filter, updater );
        return result.modifiedCount > 0;
    },
}