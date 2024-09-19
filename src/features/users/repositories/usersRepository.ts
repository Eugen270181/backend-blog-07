import {db} from "../../../common/module/db/db"
import {ObjectId,WithId} from "mongodb"
import {UserDbModel} from "../../../common/types/db/user-db.model";

export const usersRepository = {
    async createUser(user: UserDbModel):Promise<string> {
        const result = await db.getCollections().usersCollection.insertOne(user)
        return result.insertedId.toString() // return _id -objectId
    },
    async getUserById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return db.getCollections().usersCollection.findOne({ _id: new ObjectId(id) });
    },
    async getUserByCredentials(inputLogin:string):Promise<WithId<UserDbModel>|null> {
        const search = { $or: [
            { login: inputLogin },  // поля логина
            { email: inputLogin }      // или электронная почта
        ] }
        return db.getCollections().usersCollection.findOne(search);
    },
    async findUserByLogin(login: string) {
        return db.getCollections().usersCollection.findOne({login})
    },
    async findUserByEmail(email: string) {
        return db.getCollections().usersCollection.findOne({email} )
    },
    async deleteUser(id:ObjectId){
        const result = await db.getCollections().usersCollection.deleteOne({ _id: id });
        return result.deletedCount > 0
    }
}