import {Response, Request} from 'express'
import {LoginInputModel} from "../types/input/login-input.model";
import {authServices} from "../services/authServices";
import {LoginSuccessOutputModel} from "../types/output/login-success-output.model";
import {jwtServices} from "../../../common/adapters/jwtServices";


export const loginAuthController = async (req: Request<any, any, LoginInputModel>, res: Response<LoginSuccessOutputModel>) => {
    const isLogin = await authServices.isLogin(req.body)
    if (!isLogin.status) {
        res.sendStatus(401)
        return
    }
    const accessToken = await jwtServices.createJWT(isLogin.data!)
    res.status(200).send({accessToken})
}