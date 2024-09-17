import {Router} from 'express'
import {commentValidators} from "./middlewares/commentValidators";

import {delCommentController} from "./controllers/delCommentController";
import {updateCommentController} from "./controllers/updateCommentController";
import {authMiddleware} from "../../common/middleware/authMiddleware";
import {findCommentController} from "./controllers/findCommentController";


export const commentsRouter = Router()

commentsRouter.get('/:id', findCommentController)
commentsRouter.put('/:id', authMiddleware,...commentValidators, updateCommentController)
commentsRouter.delete('/:id', authMiddleware, delCommentController)


// не забудьте добавить роут в апп