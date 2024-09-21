import {Response, Request} from 'express'
import {usersServices} from "../services/usersServices";
import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {CreateUserInputModel} from "../types/input/create-user-input.type";
import {UserOutputModel} from "../types/output/user-output.type";
import {OutputErrorsType} from "../../../common/types/outputErrors.type";


export const createUserController = async (req: Request<any, any, CreateUserInputModel>, res: Response<UserOutputModel|OutputErrorsType>) => {
    const newUserResult = await usersServices.createUser(req.body)
    if (!newUserResult.status) {
        res.status(400).send({ errorsMessages: [ {message:'Not unique field!', field:newUserResult.data!} ] })
        return
    }

    const newUser = await usersQueryRepository.getMapUser(newUserResult.data!)

    if (!newUser) {
        console.log('юзер был создан, но не найден')
        res.sendStatus(504)
        return
    }
    res.status(201).send(newUser)
};