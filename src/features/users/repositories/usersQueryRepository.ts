import {userCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {validQueryType} from "../../../common/types/valid-query-type";
import {pagUserOutputModel} from "../types/output/pag-user-output.type";
import {UserOutputModel} from "../types/output/user-output.type";
import {UserDbModel} from "../../../common/types/db/user-db.model";
import {MeOutputModel} from "../../auth/types/output/me-output.model";


export const usersQueryRepository = {
    async getUserById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return userCollection.findOne({ _id: new ObjectId(id) });
    },
    async getMapUser(id: string) {
        const user = await this.getUserById(id)
        return user?this.mapUser(user):null
    },
    async getMapMe(id: string) {
        const user = await this.getUserById(id)
        if (!user) return null
        return this.mapMe(user)
    },
    async getMapUsers(query:validQueryType):Promise<pagUserOutputModel> {
        const searchLogin = query.searchLoginTerm ? {login:{$regex:query.searchLoginTerm,$options:'i'}}:{}
        const searchEmail = query.searchEmailTerm ? {email:{$regex:query.searchEmailTerm,$options:'i'}}:{}
        const search = {$or:[searchLogin,searchEmail]}
        try {
            const users = await userCollection
                .find(search)
                .sort(query.sortBy,query.sortDirection)
                .skip((query.pageNumber-1)*query.pageSize)
                .limit(query.pageSize)
                .toArray()
            const totalCount = await userCollection.countDocuments(search)
            return {
                pagesCount: Math.ceil(totalCount/query.pageSize),
                page: query.pageNumber,
                pageSize:query.pageSize,
                totalCount,
                items:users.map(this.mapUser)
            }
        }
        catch(e){
            console.log(e)
            throw new Error(JSON.stringify(e))
        }

    },
    mapUser(user:WithId<UserDbModel>):UserOutputModel{
        const { _id, passHash,...userForOutPut} = user;//деструктуризация
        return {id:user._id.toString(),...userForOutPut}
    },
    mapMe(user:WithId<UserDbModel>):MeOutputModel{
        const { _id,email, login} = user;//деструктуризация
        return { email, login, userId:_id.toString()}
    },
}
