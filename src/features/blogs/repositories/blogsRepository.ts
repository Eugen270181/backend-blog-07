import {BlogDbModel} from '../../../common/types/db/blog-db.model'
import {db} from "../../../common/module/db/db"
import {ObjectId} from "mongodb"
import {UpdateBlogInputModel} from "../types/input/update-blog-input.type";

const blogsCollection = db?.getCollections().blogsCollection;
export const blogsRepository = {
    async createBlog(blog: BlogDbModel):Promise<string> {
        const result = await blogsCollection.insertOne(blog)
        return result.insertedId.toString() // return _id -objectId
    },
    async findBlogById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return blogsCollection.findOne({ _id: new ObjectId(id) });
    },
    async deleteBlog(id:ObjectId){
        const result = await blogsCollection.deleteOne({ _id: id });
        return result.deletedCount > 0
    },
    async updateBlog(blog:UpdateBlogInputModel, id:string) {
        const {name, description, websiteUrl} = blog
        const filter = { _id: new ObjectId(id) }
        const updater = { $set: { ...{name, description, websiteUrl} } }
        const result = await blogsCollection.updateOne(filter, updater)
        return result.modifiedCount > 0
    },
}