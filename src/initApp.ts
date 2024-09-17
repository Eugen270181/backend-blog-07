import express from 'express'
import cors from 'cors'
import {authRouter} from './features/auth'
import {usersRouter} from './features/users'
import {blogsRouter} from './features/blogs'
import {testingRouter} from './features/testing'
import {postsRouter} from './features/posts'
import {commentsRouter} from "./features/comments";
import {routersPaths} from "./common/settings/paths";



export const initApp = () => {
    const app = express() // создать приложение

    app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
    app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

    app.use(routersPaths.auth, authRouter)
    app.use(routersPaths.users, usersRouter)
    app.use(routersPaths.blogs, blogsRouter)
    app.use(routersPaths.posts, postsRouter)
    app.use(routersPaths.comments, commentsRouter)
    app.use(routersPaths.testing, testingRouter)

    return app
}


