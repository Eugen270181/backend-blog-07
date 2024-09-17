import {Router} from 'express'
import {userValidators} from "./middlewares/userValidators";
import {adminMiddleware} from "../../common/middleware/adminMiddleware";
import {getUsersController} from "./controllers/getUsersController";
import {createUserController} from "./controllers/createUserController";
import {delUserController} from "./controllers/delUserController";


export const usersRouter = Router()

usersRouter.get('/', getUsersController)
usersRouter.post('/', adminMiddleware,...userValidators, createUserController)
usersRouter.delete('/:id', adminMiddleware, delUserController)


// не забудьте добавить роут в апп