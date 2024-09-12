import {Request, Response} from 'express'
import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {inputQuerySanitizer} from "../../../common/module/inputQuerySanitizer";
import {validQueryType} from "../../../common/types/valid-query-type";
import {anyQueryType} from "../../../common/types/any-query-type";
import {pagUserOutputModel} from "../types/output/pag-user-output.type";

export const getUsersController = async (req:Request, res:Response<pagUserOutputModel>) => {
    const sanitizedQuery:validQueryType = inputQuerySanitizer(req.query as anyQueryType)
    const foundUsers = await usersQueryRepository.getMapUsers(sanitizedQuery)
    res.status(200).send(foundUsers)
    return
}