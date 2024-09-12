import {userCollection} from "../../../common/module/db/dbMongo"
import {ObjectId,WithId} from "mongodb"
import {UserDbModel} from "../../../common/types/db/user-db.model";


export const usersRepository = {
    async createUser(user: UserDbModel):Promise<string> {
        const result = await userCollection.insertOne(user)
        return result.insertedId.toString() // return _id -objectId
    },
    async getUserById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return userCollection.findOne({ _id: new ObjectId(id) });
    },
    async getUserByCredentials(inputLogin:string):Promise<WithId<UserDbModel>|null> {
        const search = { $or: [
            { login: inputLogin },  // поля логина
            { email: inputLogin }      // или электронная почта
        ] }
        return userCollection.findOne(search);
    },
    async findUserByLogin(login: string) {
        return userCollection.findOne({login})
    },
    async findUserByEmail(email: string) {
        return userCollection.findOne({email} )
    },
    async deleteUser(id:ObjectId){
        const result = await userCollection.deleteOne({ _id: id });
        return result.deletedCount > 0
    }
}