import {LoginInputModel} from "../types/input/login-input.model";
import {hashServices} from "../../../common/adapters/hashServices";
import {usersRepository} from "../../users/repositories/usersRepository";
import {Result} from "../../../common/types/result.type";
import {ResultStatus} from "../../../common/types/enum/resultStatus";

export const authServices = {
    async isLogin(login:LoginInputModel):Promise< Result<string> > {
        //TODO With CLASSES!!!!!!
        const {loginOrEmail, password} = login
        const user=await usersRepository.getUserByCredentials(loginOrEmail)
        if (!user) return {status:ResultStatus.NotFound}

        const checkPas = await hashServices.checkHash(password, user.passwordHash)

        if (!checkPas) return {data:user._id.toString(),status:ResultStatus.NotFound}
        return {data:user._id.toString(),status:ResultStatus.Success}
    }
}