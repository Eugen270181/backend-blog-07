import {BlogDbModel} from '../../../common/types/db/blog-db.model'
import {blogCollection} from "../../../common/module/db/dbMongo"
import {ObjectId} from "mongodb"
import {UpdateBlogInputModel} from "../types/input/update-blog-input.type";


export const blogsRepository = {
    async createBlog(blog: BlogDbModel):Promise<string> {
        const result = await blogCollection.insertOne(blog)
        return result.insertedId.toString() // return _id -objectId
    },
    async findBlogById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return blogCollection.findOne({ _id: new ObjectId(id) });
    },
    async deleteBlog(id:ObjectId){
        const result = await blogCollection.deleteOne({ _id: id });
        return result.deletedCount > 0
    },
    async updateBlog(blog:UpdateBlogInputModel, id:string) {
        const {name, description, websiteUrl} = blog
        const filter = { _id: new ObjectId(id) }
        const updater = { $set: { ...{name, description, websiteUrl} } }
        const result = await blogCollection.updateOne(filter, updater)
        return result.modifiedCount > 0
    },
}