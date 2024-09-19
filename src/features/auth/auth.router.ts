import {Router} from 'express'
import {loginAuthController} from "./controllers/loginAuthController";
import {loginAuthValidators} from "./middlewares/loginAuthValidators";
import {getMeController} from "./controllers/getMeController";
import {authMiddleware} from "../../common/middleware/authMiddleware";
export const authRouter = Router()

//testingRouter.use(adminMiddleware)
authRouter.post('/login', loginAuthValidators, loginAuthController)
authRouter.get('/me', authMiddleware, getMeController)