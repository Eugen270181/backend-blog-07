import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env
export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    ADMIN: process.env.ADMIN || 'admin:qwerty',
    MONGO_URL:process.env.MONGO_URL || 'mongodb+srv://admin:admin@blogerplatform.vkvms.mongodb.net/BlogsPosts?retryWrites=true&w=majority&appName=BlogerPlatform',
    DB_NAME:process.env.DB_NAME || 'BlogsPosts',
    SECRET_KEY:'QWED453DFG',
    BLOG_COLLECTION_NAME:process.env.BLOG_COLLECTION_NAME || 'Blogs',
    POST_COLLECTION_NAME:process.env.POST_COLLECTION_NAME || 'Posts',
    USER_COLLECTION_NAME:process.env.USERS_COLLECTION_NAME || 'Users',
    COMMENT_COLLECTION_NAME:process.env.COMMENT_COLLECTION_NAME || 'Comments'
}
//console.log(process.env.MONGO_URL)
// console.log(process.env.ADMIN)