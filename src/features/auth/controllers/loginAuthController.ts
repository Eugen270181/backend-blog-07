import {Response} from 'express'
import {LoginInputModel} from "../types/input/loginInput.model";
import {authServices} from "../services/authServices";
import {LoginSuccessOutputModel} from "../types/output/loginSuccessOutput.model";
import {jwtServices} from "../../../common/adapters/jwtServices";
import {HttpStatus} from "../../../common/types/enum/httpStatus";
import {RequestWithBody} from "../../../common/types/requests.type";


export const loginAuthController = async (req: RequestWithBody<LoginInputModel>, res: Response<LoginSuccessOutputModel>) => {
    const isLogin = await authServices.isLogin(req.body)
    if (!isLogin.status) return res.sendStatus(HttpStatus.Unauthorized)
    const accessToken = await jwtServices.createToken(isLogin.data!)
    return res.status(HttpStatus.Success).send({accessToken})
}