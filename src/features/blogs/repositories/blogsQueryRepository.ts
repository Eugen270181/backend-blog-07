import {BlogDbModel} from '../../../common/types/db/blog-db.model'
import {blogCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {BlogOutputModel} from "../types/output/blog-output.type";
import {validQueryType} from "../../../common/types/valid-query-type";
import {pagBlogOutputModel} from "../types/output/pag-blog-output.type";



export const blogsQueryRepository = {
    async findBlogById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return blogCollection.findOne({ _id: new ObjectId(id) });
    },
    async findBlogAndMap(id: string) {
        const blog = await this.findBlogById(id)
        return blog?this.map(blog):null
    },
    async getBlogsAndMap(query:validQueryType):Promise<pagBlogOutputModel> {
        const search = query.searchNameTerm ? {name:{$regex:query.searchNameTerm,$options:'i'}}:{}
        try {
            const blogs = await blogCollection
                .find(search)
                .sort(query.sortBy,query.sortDirection)
                .skip((query.pageNumber-1)*query.pageSize)
                .limit(query.pageSize)
                .toArray()
            const totalCount = await blogCollection.countDocuments(search)
            return {
                pagesCount: Math.ceil(totalCount/query.pageSize),
                page: query.pageNumber,
                pageSize:query.pageSize,
                totalCount,
                items:blogs.map(this.map)
            }
        }
        catch(e){
            console.log(e)
            throw new Error(JSON.stringify(e))
        }

    },
    map(blog:WithId<BlogDbModel>):BlogOutputModel{
        const { _id, ...blogForOutput } = blog;//деструктуризация
        return {id:blog._id.toString(),...blogForOutput}
    },
}
