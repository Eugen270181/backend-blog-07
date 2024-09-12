import {LoginInputModel} from "../types/input/login-input.model";
import {hashServices} from "../../../common/adapters/hashServices";
import {usersRepository} from "../../users/repositories/usersRepository";
import {ResultObject} from "../../../common/types/result-object-type";
export const authServices = {
    async isLogin(login:LoginInputModel):Promise< ResultObject<string> > {
        const {loginOrEmail, password} = login
        const user=await usersRepository.getUserByCredentials(loginOrEmail)
        if (!user) return {statusCode:0}

        const checkPas = await hashServices.checkHash(password, user.passHash)

        if (!checkPas) return {data:user._id.toString(),statusCode:0}
        return {data:user._id.toString(),statusCode:1}
    }
}