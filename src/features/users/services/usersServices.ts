import {usersRepository} from "../repositories/usersRepository";
import {ObjectId} from "bson";
import {CreateUserInputModel} from "../types/input/create-user-input.type";
import {UserDbModel} from "../../../common/types/db/userDb.model";
import {hashServices} from "../../../common/adapters/hashServices";
import { ResultClass } from '../../../common/classes/result.class';


export const usersServices = {
    async createUser(user: CreateUserInputModel) {
        //TODO:with class
        const result = new ResultClass<string>();
        const {login, password, email} = user

        if (await usersRepository.findUserByLogin(login)) return {data: 'login', status: 0}

        if (await usersRepository.findUserByEmail(email)) return {data: 'email', status: 0}

        const newUser: UserDbModel = {
            ...{login, email},
            passwordHash: await hashServices.getHash(password),
            createdAt: new Date().toISOString()
        }
        const newUserId = await usersRepository.createUser(newUser)
        return {data: newUserId, status: 1}
    },
    async deleteUser(id: string) {
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return false
        return usersRepository.deleteUser(new ObjectId(id))
    }
}