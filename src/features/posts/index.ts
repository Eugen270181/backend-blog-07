import {Router} from 'express'
import {createPostController} from './controllers/createPostController'
import {getPostsController} from './controllers/getPostsController'
import {findPostController} from './controllers/findPostController'
import {delPostController} from './controllers/delPostController'
import {putPostController} from './controllers/putPostController'
import {postValidators} from './middlewares/postValidators'
import {adminMiddleware} from '../../common/middleware/admin-middleware'
import {findPostCommentsController} from "./controllers/findPostCommentsController";
import {authMiddleware} from "../../common/middleware/auth-middleware";
import {commentValidators} from "../comments/middlewares/commentValidators";
import {createPostCommentController} from "./controllers/createPostCommentController";

export const postsRouter = Router()


postsRouter.get('/', getPostsController)
postsRouter.get('/:id', findPostController)
postsRouter.get('/:id/comments', findPostCommentsController)//new - task-06
postsRouter.post('/:id/comments', authMiddleware,...commentValidators, createPostCommentController)//new - task-06
postsRouter.post('/',  adminMiddleware, ...postValidators, createPostController)
postsRouter.delete('/:id',  adminMiddleware, delPostController)
postsRouter.put('/:id', adminMiddleware, ...postValidators, putPostController)

// не забудьте добавить роут в апп