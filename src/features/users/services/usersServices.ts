import {usersRepository} from "../repositories/usersRepository";
import {ObjectId} from "bson";
import {CreateUserInputModel} from "../types/input/create-user-input.type";
import {UserDbModel} from "../../../common/types/db/user-db.model";
import {hashServices} from "../../../common/adapters/hashServices";
import {ResultObject} from "../../../common/types/result-object-type";


export const usersServices = {
    async createUser(user: CreateUserInputModel): Promise<ResultObject<string>> {
        const {login, password, email} = user

        if (await usersRepository.findUserByLogin(login)) return {data: 'login', statusCode: 0}

        if (await usersRepository.findUserByEmail(email)) return {data: 'email', statusCode: 0}

        const newUser: UserDbModel = {
            ...{login, email},
            passwordHash: await hashServices.getHash(password),
            createdAt: new Date().toISOString()
        }
        const newUserId = await usersRepository.createUser(newUser)
        return {data: newUserId, statusCode: 1}
    },
    async deleteUser(id: string) {
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return false
        return usersRepository.deleteUser(new ObjectId(id))
    }
}