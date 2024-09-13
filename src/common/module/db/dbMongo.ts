import {Db, Collection, MongoClient} from "mongodb"
import {BlogDbModel} from '../../types/db/blog-db.model'
import {PostDbModel} from '../../types/db/post-db.model'
import {appConfig} from "../../settings/config";
import {UserDbModel} from "../../types/db/user-db.model";
import {CommentDbModel} from "../../types/db/comment-db.model";




// получение доступа к бд
const client: MongoClient = new MongoClient(appConfig.MONGO_URL)
export const dbMongo: Db = client.db(appConfig.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDbModel> = dbMongo.collection<BlogDbModel>(appConfig.BLOG_COLLECTION_NAME)

export const postCollection: Collection<PostDbModel> = dbMongo.collection<PostDbModel>(appConfig.POST_COLLECTION_NAME)

export const userCollection: Collection<UserDbModel> = dbMongo.collection<UserDbModel>(appConfig.USER_COLLECTION_NAME)

export const commentCollection: Collection<CommentDbModel> = dbMongo.collection<CommentDbModel>(appConfig.COMMENT_COLLECTION_NAME)
// проверка подключения к бд
export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}