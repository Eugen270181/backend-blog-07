import {blogCollection, commentCollection, postCollection, userCollection} from "../../../common/module/db/dbMongo"


export const testingRepository = {
    async clearDB() {
        try {
            await blogCollection.drop()
            await postCollection.drop()
            await userCollection.drop()
            await commentCollection.drop()
            console.log('drop all collections')
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    },
}